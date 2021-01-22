import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FileLoaderService} from '../shared/services/file-loader.service';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css'],
})
export class MonitoringComponent implements OnInit {

  addServiceCollapse = false;
  serviceList = [];
  checking;
  checkDelay = environment.defaultPingDelayTime;
  nextCheckTime = 0;
  date = Date.now();

  private _servicesURL = 'assets/config/services.json';

  constructor(private _fileLoaderService: FileLoaderService, private _ngxToasterService: ToastrService, private cdr: ChangeDetectorRef) {
  }

  getCurrentDate() {
    this.cdr.detach();
    setTimeout(() => {
      this.cdr.reattach();
    });
    return new Date().getTime();
  }

  ngOnInit(): void {
    this.getServices();
    this.startCheck();
  }

  addNewService(service) {
    this.serviceList.push(service);
    this.addServiceCollapse = false;
    this.initServices();
    this.checkServices();
  }

  startCheck() {
    new Observable(observer => {
      setTimeout(() => {
        this.checkServices();
        observer.next();
      }, environment.defaultPingDelayTime * 1000);
    }).subscribe(() => {
      this.startCheck();
    });
  }

  initServices() {
    this.serviceList.map((service: any) => {
      service.abrev = (service.name as string).split(' ').map((word: string) => word[0]).join('');
      return service;
    });
  }

  getServices() {
    // this._fileLoaderService.getJSON(this._servicesURL).subscribe((data: any) => {
    //   console.log(data);
      this.serviceList = environment.services || [];
      this.initServices();
      this.checkServices();
    // }, (err: any) => {
    //   this._ngxToasterService.error('Error while loading services , please check configuration\'s files');
    // });
  }

  checkServices() {
    this.nextCheckTime = Date.now() + environment.defaultPingDelayTime * 1000;
    let checked = 0;
    this.checking = true;
    this.serviceList.map((service: any) => {
      const startTimestamp = new Date().getTime();
      service.checking = true;
      this._fileLoaderService.checkServiceStatus(service.url).subscribe((res) => {
        checked++;
        this.checking = checked !== this.serviceList.length;
        this.processCheckResult(res, service, startTimestamp);
        return service;
      }, (res) => {
        checked++;
        this.checking = checked !== this.serviceList.length;
        service.checking = false;
        service.isUp = res.ok;
        this.reportServiceIssue(service);
      });

    });
  }

  processCheckResult(result, service, startTimestamp) {
    service.loadTime = Date.now() - startTimestamp;
    service.lastSuccessPing = Date.now();
    service.isUp = result.ok;
    service.checking = false;
    return service;
  }

  reportServiceIssue(service: any) {
    this._fileLoaderService.reportIssue(service);
  }

  addServicetoggle() {
    this.addServiceCollapse = !this.addServiceCollapse;
  }

}
