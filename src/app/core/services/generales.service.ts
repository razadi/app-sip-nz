import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastService } from './toast.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeneralesService {

  apiServe = `${environment.apiserver}General`;
  // headers = new HttpHeaders().set('content-type', 'application/json');
  // options = {headers: this.headers};

  condiciones = [
    { valor: '=', label: 'IGUAL A' },
    { valor: '<>', label: 'DIFERENTE A' },
    { valor: '>', label: 'MAYOR QUE' },
    { valor: '<', label: 'MENOR QUE' },
    { valor: '>=', label: 'MAYOR O IGUAL A' },
    { valor: '<=', label: 'MENOR O IGUAL A' }
  ];

  tiposGral = [
    {valor: 'variable', label: 'CALIFICACIÓN' },
    {valor: 'motricidad', label: 'MOTRICIDAD' },
    {valor: 'dependencia', label: 'DEPENDENCIA' },
    {valor: 'situacion', label: 'SITUACIÓN' },
    {valor: 'variablex', label: 'DEPRECADO' },
  ];

  // colores de escenarios
  listColors = [
    {valor: '#028618', label: 'Verde' },
    {valor: '#020f86', label: 'Azul' },
    {valor: '#d8d400', label: 'Amarillo' },
    {valor: '#dba100', label: 'Naranja' },
    {valor: '#860202', label: 'Rojo' },
    {valor: '#a800db', label: 'Morado' },
    {valor: '#1ad4c5', label: 'Cian' }
  ];

  constructor(
    private http: HttpClient,
    private toastService: ToastService
  ) { }

  getValoresByTipo(tipo) {
    return this.http.get(`${this.apiServe}/generalesBy/${tipo}`).pipe(map((res: any) => {
      if (res.error) {
        this.toastService.addSingle('error', 'Error al recuperar los valores');
      }
      return res;
    }));
  }

}
