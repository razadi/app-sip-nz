import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VigilantRoutingModule } from './vigilant-routing.module';
import { VigilantComponent } from './vigilant.component';


@NgModule({
  declarations: [VigilantComponent],
  imports: [
    CommonModule,
    VigilantRoutingModule
  ]
})
export class VigilantModule { }
