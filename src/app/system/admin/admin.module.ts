import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { NzmoduleModule } from 'src/app/shared/nzmodule/nzmodule.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    NzmoduleModule,
    ComponentsModule
  ]
})
export class AdminModule { }
