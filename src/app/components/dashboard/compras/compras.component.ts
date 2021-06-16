import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Repuesto } from '../../../models/repuesto';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent implements OnInit {
  //Variables
  comprarForm: FormGroup;
  loading = false;
  titulo = 'comprar repuesto';
  mostrarError = false;
  id: string | null;

  constructor(private fb: FormBuilder,
              private _apiService: ApiService,
              private toastr: ToastrService,
              private activeRoute: ActivatedRoute
              ) {
    //VALIDACIONES
    this.comprarForm = this.fb.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      cantidad: ['', Validators.required],
      costo: ['', Validators.required],
      utilidad: ['30', Validators.required],
    })

    //Obtiene el ID de una registro de la bd en la url 
    this.id = this.activeRoute.snapshot.paramMap.get('id');
  }
  

  ngOnInit(): void {
    this.esEditar();
  }
  
  ngOnDestroy(): void {
  }

  //AGREGAR UN NUEVO REPUESTO A LA BD
  agregarRepuesto(){
    if (this.comprarForm.invalid) {
      this.error();
      return;
    }

    const codigo = this.comprarForm.get('codigo')?.value;
    const nombre = this.comprarForm.get('nombre')?.value;
    const cantidad:number = this.comprarForm.get('cantidad')?.value;
    const costo:number = this.comprarForm.get('costo')?.value;
    const utilidad:number = this.comprarForm.get('utilidad')?.value;
    
    const diferencia = utilidad/100*costo;
    const venta =diferencia + costo;
    this.loading = true;
  
     const REPUESTO: Repuesto = {
      codigo: codigo,
      nombre: nombre,
      cantidad: cantidad,
      costo: costo,
      utilidad: utilidad/100,
      venta: venta
    }

     //SI existe un ID, la operacion es editar
      if (this.id !== null) {
        //editamos repuesto
        this._apiService.putRepuesto(this.id, REPUESTO).subscribe(res => {
          console.log(res);
          this.loading= false;
          this.toastr.success('¡El repuesto ha sido actualizado correctamente!', 'Actualizado.');
        }, error => {
          console.log(error);
          this.loading = false;
          this.toastr.error('Ha ocurrido un error', 'Error.')
        })

      }else{
        //agregamos repuesto
          this._apiService.postRepuesto(REPUESTO).subscribe(res =>{
          console.log(res);
          this.loading= false;
          this.toastr.success('¡El repuesto ha sido agregado correctamente!', 'Agregado.');
        }, error =>{
          console.log(error);
          this.loading = false;
          this.toastr.error('Ha ocurrido un error', 'Error.')
        }); 
        this.comprarForm.reset();
      }
  }

  esEditar(){
    if (this.id !== null) {
      this.loading = true;
      this.titulo = 'Editar repuesto'
      this._apiService.getRepueestoById(this.id).subscribe(data =>{
        this.loading = false;
        this.comprarForm.setValue({
          codigo: data.codigo,
          nombre: data.nombre,
          cantidad: data.cantidad,
          costo: data.costo,
          utilidad: data.utilidad*100,
        })
      }, error => {
        console.log(error);
        this.loading = false;
        this.toastr.error('Ha ocurrido un error', 'Error.')
      });
      this.comprarForm.reset();
    }
  }

  error(){
    this.mostrarError = true;
    //Muestra por 3seg el mensaje de error
      setTimeout(() => {
        this.mostrarError = false;
      }, 3000);
  }

  
}
