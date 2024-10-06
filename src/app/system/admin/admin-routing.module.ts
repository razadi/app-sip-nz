import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';

const routes: Routes = [
  { 
    path: '', 
    component: AdminComponent,
    children: [
      { path: 'tarifas', loadChildren: () => import('./tarifas/tarifas.module').then(m => m.TarifasModule) },
      { path: 'cotizas', loadChildren: () => import('./cotizas/cotizas.module').then(m => m.CotizasModule) },
      { path: 'ventas', loadChildren: () => import('./ventas/ventas.module').then(m => m.VentasModule) },      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
