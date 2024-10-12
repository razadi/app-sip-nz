import { Pipe, PipeTransform } from '@angular/core';
import { GeneralesService } from '../../core/services/generales.service';

@Pipe({
  name: 'condicion'
})
export class CondicionPipe implements PipeTransform {

  constructor(
    private gralesService: GeneralesService
  ) {}

  transform(value: string, ...args: number[]): string {
    let returnValue: any;
    if (args[0] === 1) {
      returnValue = this.gralesService.condiciones.find(res => res.valor === value);
    } else if (args[0] === 2) {
      returnValue = this.gralesService.tiposGral.find(res => res.valor === value);
    }
    return returnValue ? returnValue.label : '';
  }

}
