import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StagesComponent } from './stages.component';

const routes: Routes = [{ path: '', component: StagesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StagesRoutingModule { }
