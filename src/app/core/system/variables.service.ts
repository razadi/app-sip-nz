import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ToastService } from '../services/toast.service';
import { IVariable } from '../models/variable.model';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {

  apiServe = `${environment.apiserver}Variable`;
  headers = new HttpHeaders().set('content-type', 'application/json');
  options = {headers: this.headers};

  constructor(
    private http: HttpClient,
    private toastService: ToastService
  ) { }

  getVariables(emp: string, tipo: string = 'alls') {
    return this.http.get(`${this.apiServe}/variables/${emp}/${tipo}`).pipe(map((res: any) => {
      if (res.error) {
        this.toastService.addSingle('error', 'Error al recuperar los usuarios');
      }
      return res;
    }));
  }

  getVariable(emp: string, cve: number) {
    return this.http.get(`${this.apiServe}/variable/${emp}/${cve}`).pipe(map((res: any) => {
      if (res.error) {
        this.toastService.addSingle('error', 'Error al recuperar la variable');
      }
      return res;
    }));
  }

  newVariable(data: IVariable) {
    return this.http.post(`${this.apiServe}/variable`, data, this.options).pipe(map((resp) => {
        return resp;
    }));
  }

  editVariable(data: IVariable) {
    return this.http.put(`${this.apiServe}/variable`, data, this.options).pipe(map((resp) => {
      return resp;
    }));
  }

  deleteVariable(clave: string) {
    return this.http.delete(`${this.apiServe}/variable/${clave}`, this.options).pipe(map((resp) => {
      return resp;
    }));
  }

  activeVariable(clave: string) {
    return this.http.put(`${this.apiServe}/active/${clave}`, null, this.options).pipe(map((resp) => {
      return resp;
    }));
  }

}
