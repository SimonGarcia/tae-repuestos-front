import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Venta } from 'src/app/models/venta';
import { VentasService } from '../../../services/ventas.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {
  //VARIABLES
  loading = false;
  listVentas: Venta[] = [];
  totalCosto = 0;
  totalPrecioV = 0;
  totalUtilidad = 0;
  promedioGanancia = 0;

  constructor(private _ventasServices: VentasService,
              private toastr: ToastrService) { }

  ngOnInit(): void { 
    this.obtenerVentas();
  }

  obtenerVentas(){
    this.loading = true
    this._ventasServices.getVentas().subscribe(data => {
      this.listVentas = data;
   
      //CALCULA LOS TOTALES DE LA COLUMNA DE LA TABLA
      this.totalCosto = this.listVentas.reduce((
        acc,
        obj,
      ) => acc + (obj.costo), 0);
    
      this.totalPrecioV = this.listVentas.reduce((
        acc,
        obj,
      ) => acc + (obj.precio), 0);
  
      this.totalUtilidad = this.listVentas.reduce((
        acc,
        obj,
      ) => acc + (obj.utilidad), 0);

      this.promedioGanancia = this.listVentas.reduce((
        acc,
        obj,
      ) => acc + (obj.ganancia), 0);
  
      console.log(this.totalCosto);
      console.log(this.totalPrecioV);
      console.log(this.totalUtilidad);
      console.log(this.promedioGanancia/8);

      this.loading = false;
    }, error=>{
      console.log(error);
      this.loading = false;
      this.toastr.error('Ha ocurrido un error', 'Error.')       
    });
  }



}
