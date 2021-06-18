import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComprasComponent } from './compras/compras.component';
import { InventarioComponent } from './inventario/inventario.component';
import { ReportesComponent } from './reportes/reportes.component';
import { VentasComponent } from './ventas/ventas.component';


const routes: Routes = [

  { path: 'inventario', component: InventarioComponent },
  { path: 'compras', component: ComprasComponent },
  { path: 'compras/:id', component: ComprasComponent },
  { path: 'ventas', component: VentasComponent },
  { path: 'reportes', component: ReportesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
