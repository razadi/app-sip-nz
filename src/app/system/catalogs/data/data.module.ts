import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataRoutingModule } from './data-routing.module';
import { DataComponent } from './data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzmoduleModule } from '../../../shared/nzmodule/nzmodule.module';
import { SharedPipesModule } from '../../../shared/pipes/shared-pipes.module';


@NgModule({
  declarations: [DataComponent],
  imports: [
    CommonModule,
    DataRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NzmoduleModule,
    SharedPipesModule
  ]
})
export class DataModule { }
