import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SystemComponent } from './system.component';

const routes: Routes = [
  { path: '', 
    component: SystemComponent,
    children: [
      { path: '', loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
      { path: 'catalogs', loadChildren: () => import('./catalogs/catalogs.module').then(m => m.CatalogsModule) },
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'adminis', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
      { path: 'operas', loadChildren: () => import('./operas/operas.module').then(m => m.OperasModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
