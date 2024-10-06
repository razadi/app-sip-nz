import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TarifasComponent } from './tarifas.component';

const routes: Routes = [{ path: '', component: TarifasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarifasRoutingModule { }
