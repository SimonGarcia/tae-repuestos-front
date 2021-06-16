export class Repuesto{
    _id?: string;
    nombre: string;
    codigo: string;
    cantidad: number;
    costo: number;
    utilidad: number;
    venta: number;

    constructor(nombre = '', codigo = '', cantidad = 0, costo = 0, utilidad = 0, venta = 0){
        this.nombre = nombre;
        this.codigo = codigo;
        this.costo = costo;
        this.cantidad = cantidad;
        this.utilidad = utilidad;
        this.venta = venta
    }
}