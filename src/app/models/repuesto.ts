export class Repuesto{

    constructor(_id = '', nombre = '', codigo = '', cantidad = 0, costo = 0, utilidad = 0, venta = 0){
        this._id = _id;
        this.nombre = nombre;
        this.codigo = codigo;
        this.costo = costo;
        this.cantidad = cantidad;
        this.utilidad = utilidad;
        this.venta = venta
    }

    _id?: string;
    nombre: string;
    codigo: string;
    cantidad: number;
    costo: number;
    utilidad: number;
    venta: number;
}