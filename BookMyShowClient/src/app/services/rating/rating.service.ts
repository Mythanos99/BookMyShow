import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { httpError } from '../utils/utils';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  apiUrl:string=environment.apiUrl;
  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  rateEntity(payload:any):Observable<any>{
    // console.log(payload);
    return this.http.post<any>(this.apiUrl+'/add-rating',payload,this.httpHeader)
    .pipe(catchError(httpError));
  }
}
