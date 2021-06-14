import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  AccordionModule,
  BsDropdownModule,
  ModalModule,
  ProgressbarModule, 
  TabsModule,
  TooltipModule
} from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LoadingBarModule } from '@ngx-loading-bar/core';

import { RouterModule } from '@angular/router';
import { AdminRoutes } from './admin.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagementAuditComponent } from './management-audit/management-audit.component';
import { ManagementUserComponent } from './management-user/management-user.component';
import { ReportComponent } from './report/report.component';
import { PerancanganComponent } from './perancangan/perancangan.component';
import { PentadbiranComponent } from './pentadbiran/pentadbiran.component';
import { JenisPentaksiranComponent } from './jenis-pentaksiran/jenis-pentaksiran.component';
import { TahunTingkatanComponent } from './tahun-tingkatan/tahun-tingkatan.component';
import { KeputusanComponent } from './keputusan/keputusan.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ManagementRolesComponent } from './management-roles/management-roles.component';
import { TahunTingkatanPageYearComponent } from './tahun-tingkatan-page-year/tahun-tingkatan-page-year.component';
import { TahunTingkatanPageViewComponent } from './tahun-tingkatan-page-view/tahun-tingkatan-page-view.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ManagementAuditComponent,
    ManagementUserComponent,
    ReportComponent,
    PerancanganComponent,
    PentadbiranComponent,
    JenisPentaksiranComponent,
    TahunTingkatanComponent,
    KeputusanComponent,
    UserManagementComponent,
    ManagementRolesComponent,
    TahunTingkatanPageYearComponent,
    TahunTingkatanPageViewComponent
  ],
  imports: [
    CommonModule,
    AccordionModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    LoadingBarModule,
    NgxDatatableModule,
    RouterModule.forChild(AdminRoutes)
  ]
})
export class AdminModule { }
