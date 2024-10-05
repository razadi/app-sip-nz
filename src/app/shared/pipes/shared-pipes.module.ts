import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreasPipe } from './areas.pipe';
import { UnidadesPipe } from './unidades.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
      AreasPipe, 
      UnidadesPipe
    ],
    exports: [
      AreasPipe, 
      UnidadesPipe
    ]
})
export class SharedPipesModule { }
