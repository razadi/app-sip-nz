import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { VentasComponent } from './ventas.component';
import { NzmoduleModule } from 'src/app/shared/nzmodule/nzmodule.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [VentasComponent],
  imports: [
    CommonModule,
    FormsModule,
    VentasRoutingModule,
    NzmoduleModule,
    ComponentsModule,
  ]
})
export class VentasModule { }
