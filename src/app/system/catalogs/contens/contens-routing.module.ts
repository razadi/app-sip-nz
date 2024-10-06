import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContensComponent } from './contens.component';

const routes: Routes = [{ path: '', component: ContensComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContensRoutingModule { }
