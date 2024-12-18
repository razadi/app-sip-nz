import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VlistRoutingModule } from './vlist-routing.module';
import { VlistComponent } from './vlist.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { NzmoduleModule } from 'src/app/shared/nzmodule/nzmodule.module';


@NgModule({
  declarations: [VlistComponent],
  imports: [
    CommonModule,
    FormsModule,
    VlistRoutingModule,
    NzmoduleModule,
    ComponentsModule,
  ]
})
export class VlistModule { }
