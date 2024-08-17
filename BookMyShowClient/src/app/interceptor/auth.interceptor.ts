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
    // Clone the request and add the `withCredentials` option
    const clonedRequest = request.clone({
      withCredentials: true // Ensures cookies are included with the request
    });
    return next.handle(clonedRequest).pipe(
      catchError(err => {
        if (err.status === 401) {
          // Token expired or unauthorized access - show a popup showing the session has expired.
          // this.dialog.open(LoginComponent);
        }
        return throwError(err);
      })
    );
  }
  // #TODO - check the working of the interceptor
}
