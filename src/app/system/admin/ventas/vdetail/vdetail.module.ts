import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VdetailRoutingModule } from './vdetail-routing.module';
import { VdetailComponent } from './vdetail.component';
import { NzmoduleModule } from 'src/app/shared/nzmodule/nzmodule.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [VdetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VdetailRoutingModule,
    NzmoduleModule,
    ComponentsModule,
    DirectivesModule
  ]
})
export class VdetailModule { }
