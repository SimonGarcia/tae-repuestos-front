import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Repuesto } from '../models/repuesto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //URLS
  url = 'https://tae-repuestos.herokuapp.com/api/repuestos/';
  devUrl = 'http://localhost:3000/api/repuestos/'


  constructor(private http: HttpClient) {  }

  //Obtiene todos los registros desde la API
  getRepuestos(): Observable<any> {
    return this.http.get(this.url);
  }

  //Elimina un registro de la base de datos
  deleteRepuesto(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  //Guarda un registro en la base de datos
  postRepuesto(repuesto: Repuesto): Observable<any> {
    return this.http.post(this.url, repuesto);
  }

  //Obtiene un registro en especifico de la base de datos
  getRepueestoById(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  //Edita un registro en especifico de la base de datos
  putRepuesto(id: string, repuesto: Repuesto): Observable <any>{
    return this.http.put(this.url + id, repuesto);
  }
 
}
