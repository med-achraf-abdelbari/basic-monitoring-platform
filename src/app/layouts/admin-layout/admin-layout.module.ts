import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminLayoutRoutes} from './admin-layout.routing';
import {ChartsModule} from 'ng2-charts';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MonitoringComponent} from '../../monitoring/monitoring.component';
import {HttpClientModule} from '@angular/common/http';
import {MomentModule} from 'ngx-moment';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {AddServiceComponent} from '../../monitoring/Components/add-service/add-service.component';
import {SubSitesMonitoringComponent} from '../../monitoring/Components/sub-sites-monitoring/sub-sites-monitoring.component';
import {LogsComponent} from '../../logs/logs.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpClientModule,
    MomentModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatDialogModule,
    NgbModule,
    MatInputModule
  ],
  declarations: [
    MonitoringComponent,
    AddServiceComponent,
    SubSitesMonitoringComponent,
    LogsComponent
  ],
})

export class AdminLayoutModule {
}
