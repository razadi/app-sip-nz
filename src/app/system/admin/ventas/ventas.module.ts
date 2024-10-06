import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { VentasComponent } from './ventas.component';
import { NzmoduleModule } from 'src/app/shared/nzmodule/nzmodule.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';


@NgModule({
  declarations: [VentasComponent],
  imports: [
    CommonModule,
    VentasRoutingModule,
    NzmoduleModule,
    ComponentsModule,
  ]
})
export class VentasModule { }
