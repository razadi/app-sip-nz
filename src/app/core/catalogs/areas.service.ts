import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ToastService } from '../services/toast.service';
import { IArea } from '../models/catalogs.model';

@Injectable({
  providedIn: 'root'
})
export class AreasService {

  apiServe = `${environment.apiserver}Area`;
  headers = new HttpHeaders().set('content-type', 'application/json');
  options = {headers: this.headers};

  constructor(
    private http: HttpClient,
    private toastService: ToastService
  ) { }

  getAreas(emp: number) {
    return this.http.get(`${this.apiServe}/areas/${emp}`).pipe(map((res: any) => {
      if (res.error) {
        this.toastService.addSingle('error', 'Error al recuperar las áreas');
      }
      return res;
    }));
  }

  getArea(emp: number, clave: number) {
    return this.http.get(`${this.apiServe}/area/${emp}/${clave}`).pipe(map((res: any) => {
      if (res.error) {
        this.toastService.addSingle('error', 'Error al recuperar el usuario');
      }
      return res;
    }));
  }

  getAreaByPipe(emp: number, clave: number) {
    return this.http.get(`${this.apiServe}/area/${emp}/${clave}`).pipe(map((res: any) => {
      if (res.data === null) {
        return 'Sin área';
      }
      return res.data.name;
    })).toPromise();
  }

  newArea(data: IArea) {
    return this.http.post(`${this.apiServe}/area`, data, this.options).pipe(map((resp) => {
        return resp;
    }));
  }

  editArea(data: IArea) {
    return this.http.put(`${this.apiServe}/area`, data, this.options).pipe(map((resp) => {
      return resp;
    }));
  }

  deleteArea(emp: number, clave: string) {
    return this.http.delete(`${this.apiServe}/area/${emp}/${clave}`, this.options).pipe(map((resp) => {
      return resp;
    }));
  }

}
