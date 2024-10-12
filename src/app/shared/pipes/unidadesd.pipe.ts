import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unidadesd'
})
export class UnidadesdPipe implements PipeTransform {

  constructor() {}

  transform(value: any) {
    return value === 'N' ? 'Cuantitativo' : 'Cualitativo';
  }

}
