import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectVariablesRoutingModule } from './project-variables-routing.module';
import { ProjectVariablesComponent } from './project-variables.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzmoduleModule } from '../../../shared/nzmodule/nzmodule.module';


@NgModule({
  declarations: [ProjectVariablesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzmoduleModule,
    ProjectVariablesRoutingModule
  ]
})
export class ProjectVariablesModule { }
