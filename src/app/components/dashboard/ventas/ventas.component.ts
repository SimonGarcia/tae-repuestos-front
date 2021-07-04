import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Repuesto } from 'src/app/models/repuesto';
import { ApiService } from '../../../services/api.service';
import { Venta } from '../../../models/venta';
import { VentasService } from '../../../services/ventas.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {
  //Variables
  loading = false;
  mostrarError = false;
  ventaForm: FormGroup;
  listRepuestos: Repuesto[] = [];
  keyword = "codigo";
  hidden = false;

  utilidad = 0;
  ganancia = 0;
  costo = 0;
  precio = 0;


  constructor(private toastr: ToastrService,
              private fb: FormBuilder,
              private _apiService: ApiService,
              private _ventaService: VentasService) { 
  
        //VALIDACIONES
        this.ventaForm = this.fb.group({
          codigo: ['', Validators.required],
          nombre: ['', Validators.required],
          cantidad: ['', Validators.required],
          costo: ['', Validators.required],
          precio: ['', Validators.required],
          utilidad: ['', Validators.required],
          ganancia: ['', Validators.required]
        })

        //Trae los datos de los repuestos
        this.loading = true
        this._apiService.getRepuestos().subscribe(data => {
          this.listRepuestos = data;
          this.loading = false;
        }, error=>{
          console.log(error);
          this.loading = false;
          this.toastr.error('Ha ocurrido un error', 'Error.')       
        });
  }

  ngOnInit(): void {
  }


  selectEvent(item:any) {
   
    this.precio = item.venta;
    this.costo = item.costo;
    this.utilidad = this.precio - this.costo;
    this.ganancia = Math.round((this.utilidad*100)/this.costo)
   
    this.ventaForm.patchValue({
        codigo: item.codigo,
        nombre: item.nombre,
        costo: item.costo,
        precio: this.precio,
        utilidad: this.utilidad,
        ganancia: this.ganancia
      }) 
      
      
  }
  venderRepuesto(){
    if (this.ventaForm.invalid) {
      this.error();
      return;
    }
    
    const codigo = this.ventaForm.get('codigo')?.value;
    const nombre = this.ventaForm.get('nombre')?.value;
    const cantidad:number = this.ventaForm.get('cantidad')?.value;
    const costo:number = this.ventaForm.get('costo')?.value;
    const precio:number = this.ventaForm.get('precio')?.value;
    const utilidad:number = this.ventaForm.get('utilidad')?.value;
    const ganancia:number = this.ventaForm.get('ganancia')?.value;
    
    this.loading = true;

    const VENTA: Venta = {
      codigo: codigo,
      nombre: nombre,
      cantidad: cantidad,
      costo: costo,
      precio: precio,
      utilidad: utilidad,
      ganancia: ganancia 
    }
    
    this._ventaService.postVenta(VENTA).subscribe(res => {
      console.log(res);
      this.loading= false;
      this.toastr.success('¡La venta ha sido exitosa!', 'Exito.');
    }, error =>{
      console.log(error);
      this.loading = false;
      this.toastr.error('Ha ocurrido un error', 'Error.')
    }); 
    this.ventaForm.reset();
  }


  error(){
    this.mostrarError = true;
    //Muestra por 3seg el mensaje de error
      setTimeout(() => {
        this.mostrarError = false;
      }, 3000);
  }

}
