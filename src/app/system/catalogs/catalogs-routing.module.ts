import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogsComponent } from './catalogs.component';

const routes: Routes = [
  { 
    path: '', 
    component: CatalogsComponent,
    children: [
      { path: 'areas', loadChildren: () => import('./areas/areas.module').then(m => m.AreasModule) },
      { path: 'periods', loadChildren: () => import('./periods/periods.module').then(m => m.PeriodsModule) },
      { path: 'stages', loadChildren: () => import('./stages/stages.module').then(m => m.StagesModule) },
      { path: 'data', loadChildren: () => import('./data/data.module').then(m => m.DataModule) },
      { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
      { path: 'grales', loadChildren: () => import('./grales/grales.module').then(m => m.GralesModule) }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogsRoutingModule { }
