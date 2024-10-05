import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GralesComponent } from './grales.component';

const routes: Routes = [{ path: '', component: GralesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GralesRoutingModule { }
