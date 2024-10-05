import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SystemComponent } from './system.component';

const routes: Routes = [
  { path: '', 
    component: SystemComponent,
    children: [
      { path: '', loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
      { path: 'catalogs', loadChildren: () => import('./catalogs/catalogs.module').then(m => m.CatalogsModule) },
      { path: 'planning', loadChildren: () => import('./planning/planning.module').then(m => m.PlanningModule) },
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'vigilant', loadChildren: () => import('./vigilant/vigilant.module').then(m => m.VigilantModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
