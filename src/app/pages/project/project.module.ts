import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { NzmoduleModule } from '../../shared/nzmodule/nzmodule.module';


@NgModule({
  declarations: [ProjectComponent],
  imports: [
    CommonModule,

    NzmoduleModule,
    ProjectRoutingModule
  ]
})
export class ProjectModule { }
