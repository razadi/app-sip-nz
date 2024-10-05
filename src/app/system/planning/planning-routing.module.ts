import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanningComponent } from './planning.component';

const routes: Routes = [
  { 
    path: '', 
    component: PlanningComponent,
    children: [
      { path: 'variables', loadChildren: () => import('./variables/variables.module').then(m => m.VariablesModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanningRoutingModule { }
