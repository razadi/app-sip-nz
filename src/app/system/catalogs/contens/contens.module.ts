import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContensRoutingModule } from './contens-routing.module';
import { ContensComponent } from './contens.component';


@NgModule({
  declarations: [ContensComponent],
  imports: [
    CommonModule,
    ContensRoutingModule
  ]
})
export class ContensModule { }
