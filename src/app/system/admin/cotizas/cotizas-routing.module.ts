import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CotizasComponent } from './cotizas.component';

const routes: Routes = [{ path: '', component: CotizasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CotizasRoutingModule { }
