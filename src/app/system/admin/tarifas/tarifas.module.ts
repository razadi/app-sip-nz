import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TarifasRoutingModule } from './tarifas-routing.module';
import { TarifasComponent } from './tarifas.component';


@NgModule({
  declarations: [TarifasComponent],
  imports: [
    CommonModule,
    TarifasRoutingModule
  ]
})
export class TarifasModule { }
