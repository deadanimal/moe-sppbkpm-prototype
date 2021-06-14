import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { KeputusanComponent } from './keputusan/keputusan.component';

export const UserRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'keputusan',
                component: KeputusanComponent
            }
        ]
    }
]