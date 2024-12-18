import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';
import { SharedModule } from '../pages/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../shared/components/components.module';
import { DirectivesModule } from '../shared/directives/directives.module';
import { NzmoduleModule } from '../shared/nzmodule/nzmodule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedPipesModule } from '../shared';


@NgModule({
  declarations: [
    SystemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SystemRoutingModule,
    TranslateModule,
    SharedModule,
    ComponentsModule,
    DirectivesModule,
    NzmoduleModule,
    SharedPipesModule,    
  ],
  entryComponents: [
    
  ]
})
export class SystemModule { }
