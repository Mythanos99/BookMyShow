import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../components/auth/login/login.component';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401) {
          // Token expired or unauthorized access - dont do this directly show a popup showing the session has expired. Kindlly login again to continue.
          this.dialog.open(LoginComponent);
        }
        return throwError(err);
      })
    );
  }
  // #TODO - check the working of the interceptor
}
