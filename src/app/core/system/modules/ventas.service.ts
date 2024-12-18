import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ToastService } from '../../services/toast.service';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  apiVentas = `${environment.apiserver}/v1/ventas`;
  headers = new HttpHeaders().set('content-type', 'application/json');
  options = {headers: this.headers};

  constructor(
    private http: HttpClient,
    private toastService: ToastService
  ) { }

  private handleError<T>(operation='operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.toastService.addSingle('error', error.msg);
      return of(result as T);
    };
  }

  getVentas() {
    return this.http.get(`${this.apiVentas}/all`).pipe(
      map((resp: any) => {
        if (resp.error) {
          this.toastService.addSingle('error', resp.msg);
        }
        return resp;
      }),
      catchError(this.handleError<any>('ventas', []))
    );
  }

  getActividades(idVen: string, edo: string, pendientes: string) {
    let params = new HttpParams();
    params = params.set('idv', idVen);
    params = params.set('edo', edo);
    params = params.set('pendientes', pendientes);

    return this.http.get(`${this.apiVentas}/act`, {params}).pipe(
      map((resp: any) => {
        if (resp.error) {
          this.toastService.addSingle('error', resp.msg);
        }
        return resp;
      }),
      catchError(this.handleError<any>('actividades', []))
    );
  }

  getVenta(id: string) {
    let params = new HttpParams();
    params = params.set('id', id);

    return this.http.get(`${this.apiVentas}/det`, {params}).pipe(
      map((resp: any) => {
        if (resp.error) {
          this.toastService.addSingle('error', resp.msg);
        }
        
        return resp;
      }),
      catchError(this.handleError<any>('venta', []))
    );
  }

}
