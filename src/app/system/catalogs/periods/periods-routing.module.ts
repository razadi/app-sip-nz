import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PeriodsComponent } from './periods.component';

const routes: Routes = [{ path: '', component: PeriodsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeriodsRoutingModule { }
