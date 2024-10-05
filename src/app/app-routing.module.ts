import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./system/system.module').then(m => m.SystemModule), canActivate: [AuthGuard] },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'project', loadChildren: () => import('./pages/project/project.module').then(m => m.ProjectModule) },
  { path: 'error', loadChildren: () => import('./pages/server-error/server-error.module').then(m => m.ServerErrorModule) },
  { path: 'denied', loadChildren: () => import('./pages/access-denied/access-denied.module').then(m => m.AccessDeniedModule) },
  { path: 'notfound', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) },
  { path: '', redirectTo: 'login', pathMatch: 'full'},  
  { path: '**', redirectTo: 'notfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
