import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Repuesto } from '../../../models/repuesto';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit {
  repuestoForm = FormGroup
  repuestos: Repuesto[] = [];
  public page: number = 0;
  loading = false;
  subRepuesto: Subscription = new Subscription();
  delRepuesto: Subscription = new Subscription();

  constructor(private fb: FormBuilder,
              private _apiService: ApiService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getRepuesto();
  }

  ngOnDestroy(): void {
    this.subRepuesto.unsubscribe();  
    this.delRepuesto.unsubscribe();
  }

/*   addRepuesto(form: FormGroup){
    this._apiService.postRepuesto(form.value).subscribe(res =>{
      this.resetForm(form);
      console.log('Guardado');
      
    })
  } */

  getRepuesto(){
    this.loading = true
    this.subRepuesto = this._apiService.getRepuestos().subscribe(res => {
      this._apiService.repuestos = res as Repuesto[];
      this.loading = false;
      this.repuestos = this._apiService.repuestos
    }, error=>{
      console.log(error);
      this.loading = false;
      this.toastr.error('Ha ocurrido un error', 'Error.')       
    });
  }

  resetForm(form?: FormGroup){
    if (form){
      form.reset();
      this._apiService.repuestoSeleccionado = new Repuesto();
    }
  }


  eliminarRepuesto(_id: any){
    this.loading = true;
    this.delRepuesto = this._apiService.deleteRepuesto(_id).subscribe(res =>{
      console.log(res);
      this.getRepuesto();
      this.loading = false;
      this.toastr.warning('¡El repuesto ha sido eliminado!', 'Eliminado.');
    }, error => {
      console.log(error);
      this.loading = false;
      this.toastr.error('Ha ocurrido un error', 'Error.')
    });
  }


  editarRepuesto(id:any){
    //this._apiService.id = id;
    this.router.navigateByUrl("/dashboard/compras/"+ id); 
  }
  
  editar(repuesto: Repuesto):void{
    this._apiService.repuestoSeleccionado = Object.assign({}, repuesto);
    console.log(repuesto);
    
  }
  
}
