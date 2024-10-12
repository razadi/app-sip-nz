import { Pipe, PipeTransform } from '@angular/core';
import { GeneralesService } from '../../core/services/generales.service';

@Pipe({
  name: 'color'
})
export class ColorPipe implements PipeTransform {

  constructor(
    private generalesService: GeneralesService
  ) {}

  transform(value: string): string {
    const color = this.generalesService.listColors.find(col => col.valor === value);
    return color ? color.label : 'Sin color';
  }

}
