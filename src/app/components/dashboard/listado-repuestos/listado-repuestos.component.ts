import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Repuesto } from 'src/app/models/repuesto';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-listado-repuestos',
  templateUrl: './listado-repuestos.component.html',
  styleUrls: ['./listado-repuestos.component.scss']
})
export class ListadoRepuestosComponent implements OnInit {
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
