import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VentasComponent } from './ventas.component';

const routes: Routes = [
  { 
    path: '', 
    component: VentasComponent,
    children: [  
      { path: '', redirectTo: 'lista', pathMatch: 'full'},    
      { path: 'lista', loadChildren: () => import('./vlist/vlist.module').then(m => m.VlistModule) },
      { path: 'venta/:id', loadChildren: () => import('./vdetail/vdetail.module').then(m => m.VdetailModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule { }
