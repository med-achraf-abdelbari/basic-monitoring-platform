import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FileLoaderService} from '../../../shared/services/file-loader.service';
import {Observable, Subscription} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {ToastrService} from 'ngx-toastr';
import {LogsService} from '../../../shared/services/logs.service';

@Component({
  selector: 'app-sub-sites-monitoring',
  templateUrl: './sub-sites-monitoring.component.html',
  styleUrls: ['./sub-sites-monitoring.component.css']
})
export class SubSitesMonitoringComponent implements OnInit {

  params: any = {};
  selectedService;
  siteList = [];
  checking;
  checkDelay = environment.defaultPingDelayTime;
  nextCheckTime = 0;
  date = Date.now();
  addSiteCollapse = false;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private _fileLoaderService: FileLoaderService,
              private _logsService: LogsService,
              private cdr: ChangeDetectorRef,
              private _toaster: ToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getParentSite();
  }

  getCurrentDate() {
    this.cdr.detach();
    setTimeout(() => {
      this.cdr.reattach();
    });
    return new Date().getTime();
  }

  getParentSite() {
    this.route.params.subscribe((data: any) => {
      this.params = data;
      this.getServiceById();
    });
  }

  getServiceById() {
    this.subscription = this._fileLoaderService.getServices().subscribe((data: any[]) => {
      this.selectedService = data.find((service) => service.id == this.params.id);
      if (this.selectedService && this.selectedService.subSites) {
        this.siteList = this.selectedService.subSites;
        this.checkSites();
      } else {
        this.router.navigate(['monitoring']).then(() => {
          this._toaster.error('Wrong or unavailable service , please try again!');
        });
      }
    });
  }

  startSitesCheck() {
    new Observable(observer => {
      setTimeout(() => {
        this.checkSites();
        observer.next();
      }, environment.defaultPingDelayTime * 1000);
    }).subscribe(() => {
      this.startSitesCheck();
    });
  }

  checkSites() {
    if (this.siteList.length > 0) {
      this.startSitesCheck();
      this.nextCheckTime = Date.now() + environment.defaultPingDelayTime * 1000;
      let checked = 0;
      this.checking = true;
      this.siteList.map((site: any) => {
        const startTimestamp = new Date().getTime();
        site.checking = true;
        this._fileLoaderService.checkServiceStatus(site.url).subscribe((res) => {
          checked++;
          this.checking = checked !== this.siteList.length;
          this.processCheckResult(res, site, startTimestamp);
          return site;
        }, (res) => {
          checked++;
          this.checking = checked !== this.siteList.length;
          site.checking = false;
          site.isUp = res.ok;
          this.reportServiceIssue(site);
        });
      });
    }
  }

  processCheckResult(result, site, startTimestamp) {
    site.loadTime = Date.now() - startTimestamp;
    site.lastSuccessPing = Date.now();
    site.isUp = result.ok;
    site.checking = false;
    this._logsService.addToLog({
      date: Date.now(),
      name: site.name,
      url: site.url,
      status: 'Success'
    });
    return site;
  }

  reportServiceIssue(site: any) {
    this._logsService.addToLog({
      date: Date.now(),
      name: site.name,
      url: site.url,
      status: 'Failure'
    });
    this._fileLoaderService.reportIssue(site);
  }

  addSiteToggle() {
    this.addSiteCollapse = !this.addSiteCollapse;
  }

  addNewSite(siteData: any) {
    this.siteList.push(siteData);
  }

  deleteSite(index: number) {
    this.siteList.splice(index, 1);
  }

}
