import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OperasComponent } from './operas.component';

const routes: Routes = [{ path: '', component: OperasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperasRoutingModule { }
