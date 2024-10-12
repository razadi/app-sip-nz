import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VlistComponent } from './vlist.component';

const routes: Routes = [{ path: '', component: VlistComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VlistRoutingModule { }
