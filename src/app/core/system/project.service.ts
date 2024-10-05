import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ToastService } from '../services/toast.service';
import { map } from 'rxjs/operators';
import { ICompany } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  apiCompany = `${environment.apiserver}Company`;
  apiVariable = `${environment.apiserver}Variable`;
  headers = new HttpHeaders().set('content-type', 'application/json');
  options = {headers: this.headers};

  constructor(
    private http: HttpClient,
    private toastService: ToastService
  ) { }

  async configurated() {
    return await this.http.get(`${this.apiCompany}/statuscom`, this.options).pipe(map((res: any) => {
      if (res.error) {
        this.toastService.addSingle('error', 'Error al recuperar el estatus de la empresa');
      }      
      return res.status;
    })).toPromise();
  }

  async existsVars() {
    return await this.http.get(`${this.apiVariable}/statusvar`, this.options).pipe(map((res: any) => {
      if (res.error) {
        this.toastService.addSingle('error', 'Error al recuperar si hay variables');
      }      
      return res.status;
    })).toPromise();
  }

  getCia(): Promise<ICompany> {
    return this.http.get(`${environment.apiserver}Company/empresas`).pipe(map((res: any) => {
      if (res.error) {
        this.toastService.addSingle('error', 'Error al recuperar la empresa');
      }
      return res.data[0];
    })).toPromise();
  }

  creaPeriodos(emp, anios, inicio) {
    return this.http.get(`${this.apiCompany}/CrearPeriodos/${emp}/${anios}/${inicio}`).pipe(map((res: any) => {
      return res;
    })).toPromise();
  }

}
