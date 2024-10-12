import { Pipe, PipeTransform } from '@angular/core';
import { GeneralesService } from '../../core/services/generales.service';

@Pipe({
  name: 'escenario'
})
export class EscenarioPipe implements PipeTransform {

  constructor(
    private gralesService: GeneralesService
  ) {}

  transform(value: string, ...args: number[]): string {
    let returnValue: any;
    
    returnValue = value === '1' ? 'E' : value === '2' ? 'D' : value === '3' ? 'C' : value === '4' ? 'B' : 'A';
    
    return returnValue;
  }

}