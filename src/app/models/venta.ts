export class Venta{
    _id?: string;
    codigo: string;
    nombre: string;
    cantidad: number;
    costo: number;
    utilidad: number;// % de ganancia
    precio: number; // Precio de venta
    ganancia: number;
  

    constructor( nombre = '', codigo = '', cantidad = 0, costo = 0, utilidad = 0, ganancia = 0, precio = 0){
        this.nombre = nombre;
        this.codigo = codigo;
        this.costo = costo;
        this.cantidad = cantidad;
        this.precio = precio;
        this.utilidad = utilidad;
        this.ganancia = ganancia;
        
    }
}