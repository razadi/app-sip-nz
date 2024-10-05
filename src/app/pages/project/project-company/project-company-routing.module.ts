import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectCompanyComponent } from './project-company.component';

const routes: Routes = [{ path: '', component: ProjectCompanyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectCompanyRoutingModule { }
