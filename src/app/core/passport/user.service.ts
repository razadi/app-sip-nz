import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ToastService } from '../services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  apiServe = `${environment.apiserver}/v1/user`;
  users: IUser[] = [];
  headers = new HttpHeaders().set('content-type', 'application/json');
  options = {headers: this.headers};

  constructor(
    private http: HttpClient,
    private toastService: ToastService
  ) { }

  getUsers() {
    let data = {};
    return this.http.post(`${this.apiServe}/all`, data, this.options).pipe(map((res: any) => {
      if (res.error) {
        this.toastService.addSingle('error', 'Error al recuperar los usuarios');
      }
      return res;
    }));
  }

  getUser(clave: string) {
    let data = {cve: clave};
    return this.http.post(`${this.apiServe}/cve`, data, this.options).pipe(map((res: any) => {
      if (res.error) {
        this.toastService.addSingle('error', 'Error al recuperar el usuario');
      }
      return res;
    }));
  }

  newUser(data: IUser) {
    return this.http.post(`${this.apiServe}/new`, data, this.options).pipe(map((resp) => {
        return resp;
    }));
  }

  editUser(clave: string, data: IUser) {
    return this.http.put(`${this.apiServe}/upd`, {clave, data}, this.options).pipe(map((resp) => {
      return resp;
    }));
  }

  deleteUser(clave: string) {
    return this.http.delete(`${this.apiServe}/del/${clave}`, this.options).pipe(map((resp) => {
      return resp;
    }));
  }

  activeUser(clave: string) {
    return this.http.put(`${this.apiServe}/active`, {clave}, this.options).pipe(map((resp) => {
      return resp;
    }));
  }

}
