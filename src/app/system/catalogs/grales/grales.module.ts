import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GralesRoutingModule } from './grales-routing.module';
import { GralesComponent } from './grales.component';
import { NzmoduleModule } from '../../../shared/nzmodule/nzmodule.module';
import { UnidadesComponent } from './unidades/unidades.component';
import { FactoresComponent } from './factores/factores.component';
import { NivelesComponent } from './niveles/niveles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    GralesComponent, 
    UnidadesComponent,
    FactoresComponent,
    NivelesComponent
  ],
  imports: [
    CommonModule,
    GralesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NzmoduleModule
  ]
})
export class GralesModule { }
