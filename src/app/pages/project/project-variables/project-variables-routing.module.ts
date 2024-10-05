import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectVariablesComponent } from './project-variables.component';

const routes: Routes = [{ path: '', component: ProjectVariablesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectVariablesRoutingModule { }
