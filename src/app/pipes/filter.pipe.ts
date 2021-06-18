import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString:string ) {
    //   if (value.length === 0 || filterString === '') {
    //     return value;
    //   }
    //   const repuestos = [];
    //   for(const repuesto of value){
    //     if (repuesto['codigo'] === filterString || repuesto['nombre'] === filterString) {
    //       repuestos.push(repuesto);
    //     }
    // }
    // return repuestos;

    
    if(!filterString) return value;
    return value.filter((item:any) => (item.nombre.toLowerCase().indexOf(filterString.toLowerCase()) > -1 || item.codigo.toLowerCase().indexOf(filterString.toLowerCase()) > -1));
  }

}
