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
  listRepuestos: Repuesto[] = [];
  public page: number = 0;
  loading = false;
  searchString = "";
  subRepuesto: Subscription = new Subscription();
  delRepuesto: Subscription = new Subscription();

  constructor(private fb: FormBuilder,
              private _apiService: ApiService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerRepuestos();
  }

  ngOnDestroy(): void {
    this.subRepuesto.unsubscribe();  
    this.delRepuesto.unsubscribe();
  }


  obtenerRepuestos(){
    this.loading = true
    this.subRepuesto = this._apiService.getRepuestos().subscribe(data => {
      this.listRepuestos = data;
      this.loading = false;
    }, error=>{
      console.log(error);
      this.loading = false;
      this.toastr.error('Ha ocurrido un error', 'Error.')       
    });
  }


  eliminarRepuesto(_id: any){
    this.loading = true;
    this.delRepuesto = this._apiService.deleteRepuesto(_id).subscribe(res =>{
      console.log(res);
      this.obtenerRepuestos();
      this.loading = false;
      this.toastr.error('¡El repuesto ha sido eliminado!', 'Eliminado.');
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
  
}
