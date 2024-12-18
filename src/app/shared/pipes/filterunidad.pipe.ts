import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterunidad'
})
export class FilterunidadPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  transform(items: any[], ...args: any[]): any[] {
    return items.filter((item: any) => item.clave === args[0]);
  }

}
