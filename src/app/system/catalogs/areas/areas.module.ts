import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreasRoutingModule } from './areas-routing.module';
import { AreasComponent } from './areas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzmoduleModule } from '../../../shared/nzmodule/nzmodule.module';


@NgModule({
  declarations: [AreasComponent],
  imports: [
    CommonModule,
    AreasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NzmoduleModule
  ]
})
export class AreasModule { }
