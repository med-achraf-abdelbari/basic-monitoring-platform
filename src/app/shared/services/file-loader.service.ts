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

  constructor(private _httpClient: HttpClient,
              private _toastService: ToastrService) {
    this.getActiveConfig();
  }

  public getJSON(url: string): Observable<any> {
    return this._httpClient.get(url);
  }

  getActiveConfig() {
    this.activeConfig = environment;
    // this._httpClient.get(environment.configUrl).subscribe((config: any) => {
    //   this.activeConfig = config;
    // }, (error => {
    //   console.log('Error while loading config file');
    // }));
  }

  getServices() {
    return new Observable((observer) => {
      // This need to be changed to a list of service requested from db
      observer.next(environment.services);
    });
  }

  checkServiceStatus(serviceUrl: string): Observable<any> {
    // return this._httpClient.get(serviceUrl, {
    //   headers: new HttpHeaders({'Content-Type': 'application/json', accept: 'text/plain'}),
    //   responseType: 'text',
    //   observe: 'response'
    // });

    return this._httpClient.get(`${this.activeConfig.bypassServer}${serviceUrl}`, {
      headers: new HttpHeaders({...this.activeConfig.bypassProxyHeaders , Origin: `https://cors-anywhere${Math.random()}.herokuapp.com/`, 'Content-Type': 'application/json', accept: 'text/plain'}),
      responseType: 'text',
      observe: 'response'
    });
  }

  canSendNotification() {
    return localStorage.getItem('nextNotificationTime') == undefined || Date.now() - Number(localStorage.getItem('nextNotificationTime')) >= 0;
  }

  reportIssue(service: any) {
    if (this.activeConfig.sendEmail && this.canSendNotification()) {
       this.sendSms(service); // an sms should be sent here
      console.log('Send sms for service : ', service);
    } else {
      console.log(' ----> next notification email ');
    }
    if (this.activeConfig.sendEmail && this.canSendNotification()) {
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

    this._httpClient.post('url', {}).subscribe((data) => {
      this._toastService.error('A warning sms has been sent , please check services!');
      localStorage.setItem('nextNotificationTime', `${Date.now() + this.activeConfig.notificationsInterval * 1000}`);
    }, (error) => {
      localStorage.setItem('nextNotificationTime', `${Date.now() + this.activeConfig.notificationsInterval * 1000}`);
      debugger;
      this._toastService.error('A warning sms has been sent , please check services!');
    });
  }

  sendEmail(service) {
    // localStorage.setItem('nextNotificationTime', `${Date.now() + this.activeConfig.notificationsInterval * 1000}`);
  }


}
