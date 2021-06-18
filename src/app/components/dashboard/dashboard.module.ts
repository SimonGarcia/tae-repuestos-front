import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { InventarioComponent } from './inventario/inventario.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ComprasComponent } from './compras/compras.component';
import { VentasComponent } from './ventas/ventas.component';
import { ReportesComponent } from './reportes/reportes.component';
import { SharedModule } from '../shared/shared.module';
import { ListadoRepuestosComponent } from './listado-repuestos/listado-repuestos.component';


@NgModule({
  declarations: [
    DashboardComponent,
    InventarioComponent,
    NavbarComponent,
    ComprasComponent,
    VentasComponent,
    ReportesComponent,
    ListadoRepuestosComponent,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
