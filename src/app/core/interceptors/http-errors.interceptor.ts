import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';

// import { CatchError } from '../../store/state/errors/errors.action';
// import { ErrorState } from '../../store/state/errors/errors.state';
// import { environment } from '../../../../environments/environment';
import { environment } from '../../../environments/environment';
import { ToastService } from '../services/toast.service';

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {

  constructor(
    // private store: Store<ErrorState>
    private toasService: ToastService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // return next.handle(request);
    if (request.url.includes(`${environment.apiserver}User`)) {
      return next.handle(request).pipe(
        catchError((err: any) => {
          // this.store.dispatch(new CatchError(err.error));
          this.toasService.addSingle('error', err.error);
          return throwError(err);
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
