import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StagesRoutingModule } from './stages-routing.module';
import { StagesComponent } from './stages.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzmoduleModule } from '../../../shared/nzmodule/nzmodule.module';


@NgModule({
  declarations: [StagesComponent],
  imports: [
    CommonModule,
    StagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NzmoduleModule    
  ]
})
export class StagesModule { }
