import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AccesosResolver } from 'src/app/core/resolvers/accesos.resolver';

const routes: Routes = [
  { 
    path: '', 
    component: AdminComponent,
    children: [
      { path: 'tarifas', loadChildren: () => import('./tarifas/tarifas.module').then(m => m.TarifasModule), data: { titulo: 'SIP-Tarifas'}, resolve: { acceso: AccesosResolver}  },
      { path: 'cotizas', loadChildren: () => import('./cotizas/cotizas.module').then(m => m.CotizasModule), data: { titulo: 'SIP-Cotizaciones'}, resolve: { acceso: AccesosResolver}  },
      { path: 'ventas', loadChildren: () => import('./ventas/ventas.module').then(m => m.VentasModule), data: { titulo: 'SIP-Ventas'}, resolve: { acceso: AccesosResolver}  },      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
