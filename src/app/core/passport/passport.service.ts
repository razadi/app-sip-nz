import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SessionService } from '../services/session.service';
import { ILogin, IUser } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const defaultUser = null;
const defaultCia = null;
const defaultAcceso = null;


@Injectable({
  providedIn: 'root'
})
export class PassportService {

  apiserver = `${environment.apiserver}/v1/auth`;
  apisersys = `${environment.apiserver}/v1/sys`;

  headers = new HttpHeaders().set('content-type', 'application/json');
  options = {headers: this.headers};

  user$ = new BehaviorSubject(defaultUser);
  cia$ = new BehaviorSubject(defaultCia);
  accesos$ = new BehaviorSubject(defaultAcceso);

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) { 
    const dataUser = this.sessionService.getItem("currentUser");
    if (dataUser != null) {
        this.user$.next(dataUser);
    }
    const dataCia = this.sessionService.getItem("currentCia");
    if (dataCia != null) {
      this.cia$.next(dataCia);
    }
    const dataAcceso = sessionService.getItem('currentUserAccesos');
    if (dataAcceso != null) {
      this.accesos$.next(dataAcceso);
    }
  }

  setUser(login: any) {
    let user: IUser = login.user;
    this.sessionService.setItem("currentUser", user);
    this.sessionService.setItem('token', login.token);
    this.user$.next(user);
  }

  setCia(cia: any) {
    this.sessionService.setItem("currentCia", cia);
    this.cia$.next(cia);
  }

  setAcceso(accesos: any) {
    this.sessionService.removeItem("currentUserAccesos");
    this.sessionService.setItem("currentUserAccesos", accesos); 
    this.accesos$.next(accesos);
  }

  login(userName: string, password: string): Promise<ILogin> {
    let data = {username: userName, password};
    return this.http.post(`${this.apiserver}/login`, data, this.options).pipe(map((res: any) => {
      return res.data;
    })).toPromise();
  }
  
  logout() {
      this.sessionService.removeItem("currentUser");
      this.user$.next(defaultUser);
      this.sessionService.removeItem("currentCia");
      this.cia$.next(defaultCia);
      this.sessionService.removeItem("token");
  }

  getMenu(niv: any, emp: number) {
    let data = {niv, emp};
    return this.http.post(`${this.apisersys}/mods`, data, this.options).pipe(map((res: any) => {
      return res.data;
    })).toPromise();
  }

  getAcceso(clave: string) {
    return this.http.post(`${this.apiserver}/accesos`, {usu: clave}, this.options).pipe(map((res: any) => {
      return res.data;
    })).toPromise();
  }

}
