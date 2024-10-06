import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperasRoutingModule } from './operas-routing.module';
import { OperasComponent } from './operas.component';


@NgModule({
  declarations: [OperasComponent],
  imports: [
    CommonModule,
    OperasRoutingModule
  ]
})
export class OperasModule { }
