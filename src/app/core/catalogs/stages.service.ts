import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastService } from '../services/toast.service';
import { map } from 'rxjs/operators';
import { IStage } from '../models/catalogs.model';

@Injectable({
  providedIn: 'root'
})
export class StagesService {

  apiServe = `${environment.apiserver}Escenario`;
  headers = new HttpHeaders().set('content-type', 'application/json');
  options = {headers: this.headers};

  constructor(
    private http: HttpClient,
    private toastService: ToastService
  ) { }

  getEscenarios() {
    return this.http.get(`${this.apiServe}/escenarios`).pipe(map((res: any) => {
      if (res.error) {
        this.toastService.addSingle('error', 'Error al recuperar los escenarios');
      }
      return res;
    }));
  }

  getEscenario(clave: number) {
    return this.http.get(`${this.apiServe}/escenario/${clave}`).pipe(map((res: any) => {
      if (res.error) {
        this.toastService.addSingle('error', 'Error al recuperar el dato');
      }
      return res;
    }));
  }

  newEscenario(data: IStage) {
    return this.http.post(`${this.apiServe}/escenario`, data, this.options).pipe(map((resp) => {
        return resp;
    }));
  }

  editEscenario(data: IStage) {
    return this.http.put(`${this.apiServe}/escenario`, data, this.options).pipe(map((resp) => {
      return resp;
    }));
  }

  deleteEscenario(clave: string) {
    return this.http.delete(`${this.apiServe}/escenario/${clave}`, this.options).pipe(map((resp) => {
      return resp;
    }));
  }

}
