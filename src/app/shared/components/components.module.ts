import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnsMovComponent } from './btns-mov/btns-mov.component';
import { NzmoduleModule } from '../nzmodule/nzmodule.module';
import { SingleEditComponent } from './single-edit/single-edit.component';
import { AbcListComponent } from './abc-list/abc-list.component';
import { FormsModule } from '@angular/forms';
import { PanelComponent } from './panel/panel.component';
import { ListElementsComponent } from './list-elements/list-elements.component';
import { DataElementsComponent } from './data-elements/data-elements.component';
import { PnlVarnamesComponent } from './pnl-varnames/pnl-varnames.component';



@NgModule({
  declarations: [
    BtnsMovComponent,
    SingleEditComponent,
    AbcListComponent,
    PanelComponent,
    ListElementsComponent,
    DataElementsComponent,
    PnlVarnamesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzmoduleModule
  ],
  exports: [
    BtnsMovComponent,
    SingleEditComponent,
    AbcListComponent,
    PanelComponent,
    ListElementsComponent,
    DataElementsComponent,
    PnlVarnamesComponent
  ]
})
export class ComponentsModule { }
