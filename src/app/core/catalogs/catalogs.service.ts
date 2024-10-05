import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ToastService } from '../services/toast.service';
import { IUnidad, IFactor, INivel } from '../models/catalogs.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogsService {

  apiUnidad = `${environment.apiserver}Unidad`;
  apiFactor = `${environment.apiserver}Factor`;
  apiNivel = `${environment.apiserver}Nivel`;
  headers = new HttpHeaders().set('content-type', 'application/json');
  options = {headers: this.headers};

  constructor(
    private http: HttpClient,
    private toastService: ToastService
  ) { }

  getUnidades() {
    return this.http.get(`${this.apiUnidad}/unidades`).pipe(map((res: any) => {
      if (res.error) {
        this.toastService.addSingle('error', 'Error al recuperar los unidades');
      }
      return res;
    }));
  }

  getUnidad(clave: number) {
    return this.http.get(`${this.apiUnidad}/unidad/${clave}`).pipe(map((res: any) => {
      if (res.error) {
        this.toastService.addSingle('error', 'Error al recuperar el dato');
      }
      return res;
    }));
  }

  getUnidadByPipe(clave: number) {
    return this.http.get(`${this.apiUnidad}/unidad/${clave}`).pipe(map((res: any) => {
      if (res.data === null) {
        return 'Sin Unidad';
      }
      return res.data.descri;
    })).toPromise();
  }

  newUnidad(data: IUnidad) {
    return this.http.post(`${this.apiUnidad}/unidad`, data, this.options).pipe(map((resp) => {
        return resp;
    }));
  }

  editUnidad(data: IUnidad) {
    return this.http.put(`${this.apiUnidad}/unidad`, data, this.options).pipe(map((resp) => {
      return resp;
    }));
  }

  deleteUnidad(clave: string) {
    return this.http.delete(`${this.apiUnidad}/unidad/${clave}`, this.options).pipe(map((resp) => {
      return resp;
    }));
  }

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  getFactores() {
    return this.http.get(`${this.apiFactor}/factores`).pipe(map((res: any) => {
      if (res.error) {
        this.toastService.addSingle('error', 'Error al recuperar los factores');
      }
      return res;
    }));
  }

  getFactor(clave: number) {
    return this.http.get(`${this.apiFactor}/factor/${clave}`).pipe(map((res: any) => {
      if (res.error) {
        this.toastService.addSingle('error', 'Error al recuperar el factor');
      }
      return res;
    }));
  }

  newFactor(data: IFactor) {
    return this.http.post(`${this.apiFactor}/factor`, data, this.options).pipe(map((resp) => {
        return resp;
    }));
  }

  editFactor(data: IFactor) {
    return this.http.put(`${this.apiFactor}/factor`, data, this.options).pipe(map((resp) => {
      return resp;
    }));
  }

  deleteFactor(clave: string) {
    return this.http.delete(`${this.apiFactor}/factor/${clave}`, this.options).pipe(map((resp) => {
      return resp;
    }));
  }

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  getNiveles() {
    return this.http.get(`${this.apiNivel}/niveles`).pipe(map((res: any) => {
      if (res.error) {
        this.toastService.addSingle('error', 'Error al recuperar los niveles');
      }
      return res;
    }));
  }

  getNivel(clave: number) {
    return this.http.get(`${this.apiNivel}/nivel/${clave}`).pipe(map((res: any) => {
      if (res.error) {
        this.toastService.addSingle('error', 'Error al recuperar el nivel');
      }
      return res;
    }));
  }

  newNivel(data: INivel) {
    return this.http.post(`${this.apiNivel}/nivel`, data, this.options).pipe(map((resp) => {
        return resp;
    }));
  }

  editNivel(data: INivel) {
    return this.http.put(`${this.apiNivel}/nivel`, data, this.options).pipe(map((resp) => {
      return resp;
    }));
  }

  deleteNivel(clave: string) {
    return this.http.delete(`${this.apiNivel}/nivel/${clave}`, this.options).pipe(map((resp) => {
      return resp;
    }));
  }


}
