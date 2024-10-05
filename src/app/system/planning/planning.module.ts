import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanningRoutingModule } from './planning-routing.module';
import { PlanningComponent } from './planning.component';
import { NzmoduleModule } from '../../shared/nzmodule/nzmodule.module';


@NgModule({
  declarations: [PlanningComponent],
  imports: [
    CommonModule,
    PlanningRoutingModule,
    NzmoduleModule
  ]
})
export class PlanningModule { }
