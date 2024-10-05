import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VariablesRoutingModule } from './variables-routing.module';
import { VariablesComponent } from './variables.component';
import { NzmoduleModule } from '../../../shared/nzmodule/nzmodule.module';


@NgModule({
  declarations: [VariablesComponent],
  imports: [
    CommonModule,
    VariablesRoutingModule,
    NzmoduleModule
  ]
})
export class VariablesModule { }
