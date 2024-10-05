import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastService } from '../services/toast.service';
import { map } from 'rxjs/operators';
import { IDato } from '../models/catalogs.model';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  apiServe = `${environment.apiserver}Dato`;
  headers = new HttpHeaders().set('content-type', 'application/json');
  options = {headers: this.headers};

  constructor(
    private http: HttpClient,
    private toastService: ToastService
  ) { }

  getDatos() {
    return this.http.get(`${this.apiServe}/datos`).pipe(map((res: any) => {
      if (res.error) {
        this.toastService.addSingle('error', 'Error al recuperar los datos');
      }
      return res;
    }));
  }

  getDato(clave: number) {
    return this.http.get(`${this.apiServe}/dato/${clave}`).pipe(map((res: any) => {
      if (res.error) {
        this.toastService.addSingle('error', 'Error al recuperar el dato');
      }
      return res;
    }));
  }

  newDato(data: IDato) {
    return this.http.post(`${this.apiServe}/dato`, data, this.options).pipe(map((resp) => {
        return resp;
    }));
  }

  editDato(data: IDato) {
    return this.http.put(`${this.apiServe}/dato`, data, this.options).pipe(map((resp) => {
      return resp;
    }));
  }

  deleteDato(clave: string) {
    return this.http.delete(`${this.apiServe}/dato/${clave}`, this.options).pipe(map((resp) => {
      return resp;
    }));
  }

}
