import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {LogsService} from '../shared/services/logs.service';
import {environment} from '../../environments/environment';
import {MatPaginator} from '@angular/material/paginator';

export interface CheckLine {
  date: number;
  name: number;
  url: number;
  status: string;
}

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['date', 'name', 'url', 'status'];
  dataSource;
  logsDelay = environment.defaultPingDelayTime + 10000; // this delay is required for request await
  updating = false;
  nextCheckTime;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _logsService: LogsService,
              private cdr: ChangeDetectorRef) {
  }

  getCurrentDate() {
    this.cdr.detach();
    setTimeout(() => {
      this.cdr.reattach();
    });
    return new Date().getTime();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this._logsService.getLogs().subscribe((data: any[]) => {
      this.dataSource = new MatTableDataSource(data);
      console.log(this.dataSource);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
