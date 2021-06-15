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
  mostrarError = false;
  buyRepuesto: Subscription = new Subscription();
  esEditable: boolean = false;
  id: any;

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
  }
  

  ngOnInit(): void {

    //Editar un repuesto
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    this._apiService.id = this.id; 
    
  }
  
  ngOnDestroy(): void {
    this.buyRepuesto.unsubscribe();
  }

  //AGREGAR UN NUEVO REPUESTO A LA BD
  comprar(){
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
    const venta = Math.round(diferencia + costo);
    this.loading = true;
    

     const infoRepuesto: Repuesto = {
      codigo: codigo,
      nombre: nombre,
      cantidad: cantidad,
      costo: costo,
      utilidad: utilidad/100,
      venta: venta
    }
      this.buyRepuesto = this._apiService.postRepuesto(infoRepuesto).subscribe(res =>{
      console.log(res);
      this.loading= false;
      this.toastr.success('¡El repuesto ha sido agregado correctamente!', 'Agregado.');
    }, error =>{
      console.log(error);
      this.loading = false;
      this.toastr.error('Ha ocurrido un error', 'Error.')
    }); 
    this.reset();
  }

  reset(){
    this.comprarForm.patchValue({
      codigo: "",
      nombre: "",
      cantidad: 0,
      costo: 0,
      utilidad: 30,
      venta: 0
    })
  }

  error(){
    this.mostrarError = true;
    //Muestra por 3seg el mensaje de error
      setTimeout(() => {
        this.mostrarError = false;
      }, 3000);
  }

  
}
