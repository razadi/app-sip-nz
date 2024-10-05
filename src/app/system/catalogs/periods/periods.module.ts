import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeriodsRoutingModule } from './periods-routing.module';
import { PeriodsComponent } from './periods.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzmoduleModule } from '../../../shared/nzmodule/nzmodule.module';


@NgModule({
  declarations: [PeriodsComponent],
  imports: [
    CommonModule,
    PeriodsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NzmoduleModule
  ]
})
export class PeriodsModule { }
