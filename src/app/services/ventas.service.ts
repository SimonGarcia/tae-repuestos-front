import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venta } from '../models/venta';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  //URLS
  url = 'https://tae-repuestos.herokuapp.com/api/ventas/';
  devUrl = 'http://localhost:3000/api/ventas/'


  constructor(private http: HttpClient) {  }

  //Obtiene todos los registros desde la API
  getVentas(): Observable<any> {
    return this.http.get(this.url);
  }

  //Elimina un registro de la base de datos
  deleteVenta(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  //Guarda un registro en la base de datos
  postVenta(venta: Venta): Observable<any> {
    return this.http.post(this.devUrl, venta);
  }

  //Obtiene un registro en especifico de la base de datos
  getVentaById(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  //Edita un registro en especifico de la base de datos
  putVenta(id: string, venta: Venta): Observable <any>{
    return this.http.put(this.url + id, venta);
  }
}
