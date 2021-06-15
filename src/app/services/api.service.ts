import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Repuesto } from '../models/repuesto';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //Variables
  repuestos: Repuesto[] = []; 
  repuestoSeleccionado: Repuesto;
  id:string = "";
  
  //URLS
  RepuestosURL = 'https://tae-repuestos.herokuapp.com/api/repuestos';


  constructor(private http: HttpClient) {
    this.repuestoSeleccionado = new Repuesto();
   }

  //Obtiene todos los repuestos desde la API
  getRepuestos(){
    return this.http.get(this.RepuestosURL);
  }

  getRepuestosById(_id:string){
    console.log(this.http.get(this.RepuestosURL + `/${_id}`));
    
  }

  // Agrega un nuevo empleado
  postRepuesto(Repuesto: Repuesto){
    return this.http.post(this.RepuestosURL, Repuesto);
  }

  //Actualiza un empleado
  putRepuesto(repuesto: Repuesto){
    return this.http.put(this.RepuestosURL + `/${repuesto._id}`, repuesto);
  }

  //Elimina un empleado
  deleteRepuesto(_id: string){
    return this.http.delete(this.RepuestosURL + `/${_id}`);
  }
 
}
