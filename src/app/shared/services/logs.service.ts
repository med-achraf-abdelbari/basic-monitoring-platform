import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  logs = [];

  constructor() {
  }

  /**
   * This method will add a log line each time a service is checked
   * Future changes will be done once be is up
   * @param serviceLog
   */
  addToLog(serviceLog: any) {
    this.logs.push(serviceLog);
  }

  /**
   * Get log Array : Pagination should be implemented soon
   */
  getLogs() {
    return new Observable((observer) => {
      observer.next(this.logs);
    });
  }
}
