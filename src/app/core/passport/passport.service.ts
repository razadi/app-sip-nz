import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SessionService } from '../services/session.service';
import { IUser } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

const defaultUser = null;
const defaultCia = null;

@Injectable({
  providedIn: 'root'
})
export class PassportService {

  
  user$ = new BehaviorSubject(defaultUser);
  cia$ = new BehaviorSubject(defaultCia);

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
  }

  setUser(user: any) {
    this.sessionService.setItem("currentUser", user);
    this.user$.next(user);
  }

  setCia(cia: any) {
    this.sessionService.setItem("currentCia", cia);
    this.cia$.next(cia);
  }

  login(userName: string, password: string): Promise<IUser> {
    let data = {user: userName, pass: password};
    return this.http.post(`${environment.apiserver}Auth/login`, data).pipe(map((res: any) => {
      return res.user;
    })).toPromise();
  }
  
  logout() {
      this.sessionService.removeItem("currentUser");
      this.user$.next(defaultUser);
      this.sessionService.removeItem("currentCia");
      this.cia$.next(defaultCia);
  }

}
