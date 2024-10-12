import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreasPipe } from './areas.pipe';
import { UnidadesPipe } from './unidades.pipe';
import { CondicionPipe } from './condicion.pipe';
import { ColorPipe } from './color.pipe';
import { UnidadesdPipe } from './unidadesd.pipe';
import { EscenarioPipe } from './escenario.pipe';
import { EscenarioMetaPipe } from './escenario-meta.pipe';
import { FilterunidadPipe } from './filterunidad.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
      AreasPipe, 
      UnidadesPipe, 
      CondicionPipe, 
      ColorPipe, 
      UnidadesdPipe,
      EscenarioPipe,
      EscenarioMetaPipe,
      FilterunidadPipe
    ],
    exports: [
      AreasPipe, 
      UnidadesPipe,
      CondicionPipe,
      ColorPipe,
      UnidadesdPipe,
      EscenarioPipe,
      EscenarioMetaPipe,
      FilterunidadPipe
    ]
})
export class SharedPipesModule { }
