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
    return this.http.post<any>(this.apiUrl+'rating/add-rating',payload,this.httpHeader)
    .pipe(catchError(httpError));
  }
  fetchMovieReviews(movieId:string,page:number=0,limit:number=5):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/rating/movie/${movieId}?limit=${limit}&page=${page}`,this.httpHeader)
    .pipe(catchError(httpError));
  }
}
