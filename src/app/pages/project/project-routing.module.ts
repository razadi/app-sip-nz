import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectComponent } from './project.component';

const routes: Routes = [
  { 
    path: '', 
    component: ProjectComponent,
    children: [
      { path: 'company', loadChildren: () => import('./project-company/project-company.module').then(m => m.ProjectCompanyModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
