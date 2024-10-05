import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProjectCompanyRoutingModule } from './project-company-routing.module';
import { ProjectCompanyComponent } from './project-company.component';
import { NzmoduleModule } from '../../../shared/nzmodule/nzmodule.module';


@NgModule({
  declarations: [ProjectCompanyComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzmoduleModule,
    ProjectCompanyRoutingModule
  ]
})
export class ProjectCompanyModule { }
