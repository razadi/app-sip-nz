import { Pipe, PipeTransform } from '@angular/core';
import { AreasService } from '../../core/catalogs/areas.service';
import { PassportService } from '../../core/passport/passport.service';

@Pipe({
  name: 'areas'
})
export class AreasPipe implements PipeTransform {

  constructor(
    private areasService: AreasService,
    private passportService: PassportService
  ) {}

  async transform(value: any) {
    const emp = this.passportService.cia$.getValue();
    let returnValue: string;
    returnValue = await this.areasService.getAreaByPipe(emp.clave, value);    
    return returnValue;
  }

}
