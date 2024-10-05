import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ToastService } from '../services/toast.service';
import { ICompany } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  apiServe = `${environment.apiserver}/v1/cia`;
  headers = new HttpHeaders().set('content-type', 'application/json');
  options = {headers: this.headers};

  constructor(
    private http: HttpClient,
    private toastService: ToastService
  ) { }

  getCompanies() {
    return this.http.post(`${this.apiServe}/all`, {}, this.options).pipe(map((res: any) => {
      if (res.error) {
        this.toastService.addSingle('error', 'Error al recuperar los usuarios');
      }
      return res;
    }));
  }

  getCompany(clave: string) {
    return this.http.post(`${this.apiServe}/current`, {id: clave}, this.options).pipe(map((res: any) => {
      if (res.error) {
        this.toastService.addSingle('error', 'Error al recuperar el usuario');
      }
      return res;
    }));
  }

  newCompany(data: ICompany) {
    return this.http.post(`${this.apiServe}/empresa`, data, this.options).pipe(map((resp) => {
        return resp;
    }));
  }

  editCompany(clave: string, data: ICompany) {
    return this.http.put(`${this.apiServe}/empresa`, data, this.options).pipe(map((resp) => {
      return resp;
    }));
  }

  deleteCompany(clave: string) {
    return this.http.delete(`${this.apiServe}/empresa/${clave}`, this.options).pipe(map((resp) => {
      return resp;
    }));
  }

  activeCompany(clave: string) {
    return this.http.put(`${this.apiServe}/active/${clave}`, null, this.options).pipe(map((resp) => {
      return resp;
    }));
  }

}
