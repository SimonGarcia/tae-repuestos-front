import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent,
  loadChildren: () => import('./components/dashboard/dashboard.module')
  .then(m => m.DashboardModule), /* canActivate: [AuthGuard] */ },
  { path: '**', redirectTo: '/dashboard/inventario', pathMatch:'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
