import { Pipe, PipeTransform } from '@angular/core';
import { CatalogsService } from '../../core/catalogs/catalogs.service';

@Pipe({
  name: 'unidades'
})
export class UnidadesPipe implements PipeTransform {

  constructor(
    private catalogService: CatalogsService
  ) {}


  async transform(value: any, ...args: unknown[]) {
    let returnValue: string;
    returnValue = await this.catalogService.getUnidadByPipe(value);
    return returnValue;
  }

}
