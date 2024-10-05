import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VigilantComponent } from './vigilant.component';

const routes: Routes = [{ path: '', component: VigilantComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VigilantRoutingModule { }
