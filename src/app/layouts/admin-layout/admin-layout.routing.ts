import {Routes} from '@angular/router';
import {MonitoringComponent} from '../../monitoring/monitoring.component';
import {SubSitesMonitoringComponent} from '../../monitoring/Components/sub-sites-monitoring/sub-sites-monitoring.component';
import {LogsComponent} from '../../logs/logs.component';

export const AdminLayoutRoutes: Routes = [
  {path: '', redirectTo: 'monitoring', pathMatch: 'full'},
  {path: 'monitoring', component: MonitoringComponent},
  {path: 'monitoring/:id', component: SubSitesMonitoringComponent},
  {path: 'logs', component: LogsComponent}
];
