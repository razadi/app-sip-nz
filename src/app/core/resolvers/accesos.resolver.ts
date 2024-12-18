import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { PassportService } from '../passport/passport.service';
import { IUser } from '../models/user.model';
import { IAccesos } from '../models/acceso.model';

@Injectable({
  providedIn: 'root'
})
export class AccesosResolver implements Resolve<any[]> {

  acceso: IAccesos[] = [];
  user: IUser;

  constructor(
    private passportService: PassportService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    this.user = this.passportService.user$.getValue();
    this.acceso = this.passportService.accesos$.getValue();

    const accesoTmp = this.acceso.filter((acces: IAccesos) => acces.link === state.url);

    let crud: string[] = ['1', '1', '1', '1'];
    
    if (this.user.usu_nive === '2' || this.user.usu_nive === '3') {
      crud = accesoTmp && accesoTmp.length > 0 ? accesoTmp[0].crud.split('') : ['0', '1', '0', '0'];
    }
    
    return of(crud);
  }
}
