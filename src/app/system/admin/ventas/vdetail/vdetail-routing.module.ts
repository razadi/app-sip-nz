import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VdetailComponent } from './vdetail.component';

const routes: Routes = [{ path: '', component: VdetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VdetailRoutingModule { }
