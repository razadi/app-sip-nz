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
  
  apiServe = `${environment.apiserver}User`;
  users: IUser[] = [];
  headers = new HttpHeaders().set('content-type', 'application/json');
  options = {headers: this.headers};

  constructor(
    private http: HttpClient,
    private toastService: ToastService
  ) { }

  getUserByUserNameAndPassword(userName: string, password: string): IUser {
    console.log(userName, password);
    
    let user: IUser = null;
    if (userName === 'admin' && password === 'admin') {
      user = {clave: '1234567890', name: 'Usuario', user: userName, pass: password, mail: 'mail@dominio.com', begin: new Date(), active: 'S', status: 'A'};
    }
    return user;
  }

  // getUsers() {
  //   return this.http.get(`${this.apiServe}users`).pipe(map((res: any) => {      
  //     if (res.error) {
  //       this.toastService.addSingle('error', 'Error al recuperar los usuarios');
  //       return null;
  //     }

  //     if (res.user === null) {
  //       this.toastService.addSingle('warning', 'No existen usuarios actualmente');
  //       return null;
  //     }

  //     return res.user;
  //   })).toPromise();
  // }
  getUsers() {
    return this.http.get(`${this.apiServe}/users`).pipe(map((res: any) => {
      if (res.error) {
        this.toastService.addSingle('error', 'Error al recuperar los usuarios');
      }
      return res;
    }));
  }

  getUser(clave: string) {
    return this.http.get(`${this.apiServe}/user/${clave}`).pipe(map((res: any) => {
      if (res.error) {
        this.toastService.addSingle('error', 'Error al recuperar el usuario');
      }
      return res;
    }));
  }

  newUser(data: IUser) {
    return this.http.post(`${this.apiServe}/user`, data, this.options).pipe(map((resp) => {
        return resp;
    }));
  }

  editUser(clave: string, data: IUser) {
    return this.http.put(`${this.apiServe}/user/${clave}`, data, this.options).pipe(map((resp) => {
      return resp;
    }));
  }

  deleteUser(clave: string) {
    return this.http.delete(`${this.apiServe}/user/${clave}`, this.options).pipe(map((resp) => {
      return resp;
    }));
  }

  activeUser(clave: string) {
    return this.http.put(`${this.apiServe}/active/${clave}`, null, this.options).pipe(map((resp) => {
      return resp;
    }));
  }

}
