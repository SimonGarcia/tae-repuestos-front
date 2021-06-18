import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString:string ) {
      if (value.length === 0 || filterString === '') {
        return value;
      }
      const repuestos = [];
      for(const repuesto of value){
        if (repuesto['codigo'] === filterString || repuesto['nombre'] === filterString) {
          repuestos.push(repuesto);
        }
    }
    return repuestos;
  }

}
