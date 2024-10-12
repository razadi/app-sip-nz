import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'escenarioMeta'
})
export class EscenarioMetaPipe implements PipeTransform {

  transform(value: number[], ...args: any[]): string {
    let index = value.indexOf(1);
    let result: any;
    switch (index) {
      case 0:
        result = args[0].Ideal;
        break;
      case 1:
        result = args[0].Aceptable;
        break;      
      case 2:
        result = args[0].Medio;
        break;
      case 3:
        result = args[0].Insatisfactorio;
        break;
      case 4:
        result = args[0].Pesimo;
        break;
    }
    return result;
  }

}
