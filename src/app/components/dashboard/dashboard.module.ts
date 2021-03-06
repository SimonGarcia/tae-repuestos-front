import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe} from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { InventarioComponent } from './inventario/inventario.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ComprasComponent } from './compras/compras.component';
import { VentasComponent } from './ventas/ventas.component';
import { ReportesComponent } from './reportes/reportes.component';
import { SharedModule } from '../shared/shared.module';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';


@NgModule({
  declarations: [
    DashboardComponent,
    InventarioComponent,
    NavbarComponent,
    ComprasComponent,
    VentasComponent,
    ReportesComponent,
    FilterPipe,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    AutocompleteLibModule
  ],
  providers:[
    DecimalPipe
  ]
})
export class DashboardModule { }
