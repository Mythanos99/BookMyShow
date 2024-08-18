import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { httpError } from '../utils/utils';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl:string=environment.apiUrl;
  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  httpOptions ={
    headers: this.httpHeader.headers,
    withCredentials:true
  }
  constructor(private http: HttpClient) { }

  login(payload:any): Observable<Response>{
    console.log(payload);
    return this.http.post<Response>(this.apiUrl+'/login',payload,this.httpOptions)
    .pipe(catchError(httpError));
  }
  loginBusiness(payload:any): Observable<Response>{
    return this.http.post<Response>(this.apiUrl+'/login/business',payload,this.httpOptions)
    .pipe(catchError(httpError));
  }

  // #TODO- fix the deprecated error of throw Error
}
