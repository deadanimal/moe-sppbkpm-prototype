import { Routes } from '@angular/router';
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

export const AdminRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'perancangan',
                component: PerancanganComponent
            },
            {
                path: 'pentadbiran',
                children: [
                    {
                        path: 'jenis-pentaksiran',
                        component: JenisPentaksiranComponent
                    },
                    {
                        path: 'tahun-tingkatan',
                        component: TahunTingkatanComponent,
                    },
                    {
                        path: 'tahun-tingkatan-year',
                        component: TahunTingkatanPageYearComponent
                    },
                    {
                        path: 'tahun-tingkatan-view',
                        component: TahunTingkatanPageViewComponent
                    }
                ]
            },
            {
                path: 'keputusan',
                component: KeputusanComponent
            },
            {
                path: 'user-management',
                children: [
                    {
                        path: 'management',
                        component: UserManagementComponent
                    },
                    {
                        path: 'user',
                        component: ManagementUserComponent
                    },
                    {
                        path: 'roles',
                        component: ManagementRolesComponent
                    }
                ]
            },
            {
                path: 'audit-trails',
                component: ManagementAuditComponent
            },
            {
                path: 'report',
                component: ReportComponent
            }
        ]
    }
]