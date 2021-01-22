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
import {AddServiceComponent} from '../../monitoring/Modals/add-service/add-service.component';


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
    MatDialogModule,
    NgbModule
  ],
  declarations: [
    MonitoringComponent,
    AddServiceComponent
  ],
})

export class AdminLayoutModule {
}
