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

  apiCompany = `${environment.apiserver}/v1/cia`;
  headers = new HttpHeaders().set('content-type', 'application/json');
  options = {headers: this.headers};

  constructor(
    private http: HttpClient,
    private toastService: ToastService
  ) { }

  async configurated() {
    return await this.http.post(`${this.apiCompany}/edo`, {}, this.options).pipe(map((res: any) => {
      if (res.error) {
        this.toastService.addSingle('error', 'Error al recuperar el estatus de la empresa');
      }      
      return res.data;
    })).toPromise();
  }

  getCia(): Promise<ICompany> {
    return this.http.post(`${this.apiCompany}/current`, {id: 2}, this.options).pipe(map((res: any) => {
      if (res.error) {
        this.toastService.addSingle('error', 'Error al recuperar la empresa');
      }
      return res.data;
    })).toPromise();
  }

}
