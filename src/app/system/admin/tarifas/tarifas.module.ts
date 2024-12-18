import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TarifasRoutingModule } from './tarifas-routing.module';
import { TarifasComponent } from './tarifas.component';
import { NzmoduleModule } from 'src/app/shared/nzmodule/nzmodule.module';


@NgModule({
  declarations: [TarifasComponent],
  imports: [
    CommonModule,
    TarifasRoutingModule,
    NzmoduleModule
  ]
})
export class TarifasModule { }
