import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyAdminDirective } from './only-admin.directive';



@NgModule({
  declarations: [
    OnlyAdminDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OnlyAdminDirective
  ]
})
export class DirectivesModule { }
