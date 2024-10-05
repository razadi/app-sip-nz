import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastService } from '../services/toast.service';
import { map } from 'rxjs/operators';
import { IPeriod } from '../models/catalogs.model';

@Injectable({
  providedIn: 'root'
})
export class PeriodsService {

  apiServe = `${environment.apiserver}Periodo`;
  headers = new HttpHeaders().set('content-type', 'application/json');
  options = {headers: this.headers};

  constructor(
    private http: HttpClient,
    private toastService: ToastService
  ) { }

  getPeriodos(emp: number) {
    return this.http.get(`${this.apiServe}/periodos/${emp}`).pipe(map((res: any) => {
      if (res.error) {
        this.toastService.addSingle('error', 'Error al recuperar los periodos');
      }
      return res;
    }));
  }

  getPeriodo(emp: number, clave: number) {
    return this.http.get(`${this.apiServe}/periodo/${emp}/${clave}`).pipe(map((res: any) => {
      if (res.error) {
        this.toastService.addSingle('error', 'Error al recuperar el periodo');
      }
      return res;
    }));
  }

  newPeriodo(data: IPeriod) {
    return this.http.post(`${this.apiServe}/periodo`, data, this.options).pipe(map((resp) => {
        return resp;
    }));
  }

  editPeriodo(data: IPeriod) {
    return this.http.put(`${this.apiServe}/periodo`, data, this.options).pipe(map((resp) => {
      return resp;
    }));
  }

  deletePeriodo(emp: number, clave: string) {
    return this.http.delete(`${this.apiServe}/periodo/${emp}/${clave}`, this.options).pipe(map((resp) => {
      return resp;
    }));
  }

}
