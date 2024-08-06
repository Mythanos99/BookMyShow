import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { httpError } from '../utils/utils';
import { catchError, Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Cinema } from 'src/app/models/cinema';
@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  apiUrl:string=environment.apiUrl;
  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  getAllCinemasByLocation(city:string):Observable<Cinema[]>{
    return this.http.get<Cinema[]>(this.apiUrl+'/cinemas'+'/'+city,this.httpHeader)
    .pipe(catchError(httpError));
  }
  getCinemaById(id:string):Observable<Cinema>{
    return this.http.get<Cinema>(this.apiUrl+'/cinemas/'+id,this.httpHeader)
    .pipe(catchError(httpError));
  }
}
