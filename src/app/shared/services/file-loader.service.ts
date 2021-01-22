import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class FileLoaderService {

  activeConfig;
  smsServiceConfig;

  constructor(private _httpClient: HttpClient, private _toastService: ToastrService) {
    this.getActiveConfig();
  }

  public getJSON(url: string): Observable<any> {
    return this._httpClient.get(url);
  }

  getActiveConfig() {
    this._httpClient.get(environment.configUrl).subscribe((config: any) => {
      this.activeConfig = config;
    }, (error => {
      console.log('Error while loading config file');
    }));
  }

  checkServiceStatus(serviceUrl: string): Observable<any> {
    return this._httpClient.get(serviceUrl, {
      headers: new HttpHeaders({'Content-Type': 'application/json', accept: 'text/plain'}),
      responseType: 'text',
      observe: 'response'
    });
  }

  reportIssue(service: any) {
    if (this.activeConfig.sendSms) {
      this.sendSms(service);
    } else if (this.activeConfig.sendEmail) {
      this.sendEmail(service);
    }
  }

  sendSms(service) {
    let url = `${environment.smsServiceConfig.providerUrl}?`;
    if (environment.smsServiceConfig && environment.smsServiceConfig.params) {
      for (const param in environment.smsServiceConfig.params) {
        url += `${param}=${environment.smsServiceConfig.params[param]}&`;
      }
      url += `Body=Alert : Service ${service.name} is currently not responding please check it at : ${service.url} !`;
    }


    this._httpClient.post(url, {}).subscribe((data) => {
      this._toastService.error('A warning sms has been sent , please check services!');
    }, (error) => {
      this._toastService.error('A warning sms has been sent , please check services!');
    });


  }

  sendEmail(service) {

  }


}
