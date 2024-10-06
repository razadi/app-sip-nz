import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CotizasRoutingModule } from './cotizas-routing.module';
import { CotizasComponent } from './cotizas.component';


@NgModule({
  declarations: [CotizasComponent],
  imports: [
    CommonModule,
    CotizasRoutingModule
  ]
})
export class CotizasModule { }
