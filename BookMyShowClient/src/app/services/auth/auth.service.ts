import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

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
  constructor(private http: HttpClient) { }

  login(payload:any): Observable<Response>{
    return this.http.post<Response>(this.apiUrl+'/login',payload,this.httpHeader)
    .pipe(catchError(this.httpError));
  }
  httpError(error:HttpErrorResponse){
    let msg='';
    if(error.error instanceof ErrorEvent){
      msg=error.error.message;
    }
    else{
      msg=`Error Code:${error.status}\nMessage:${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }
  // #TODO- fix the deprecated error of throw Error
}
