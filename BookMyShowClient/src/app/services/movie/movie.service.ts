import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { httpError } from '../utils/utils';
import { catchError, Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  apiUrl:string=environment.apiUrl;
  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  getAllMovies():Observable<Movie[]>{
    return this.http.get<Movie[]>(this.apiUrl+'/movies',this.httpHeader)
    .pipe(catchError(httpError));
  }
  getFilteredMovies(queryParams: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies?${queryParams}`,this.httpHeader);
  }
}
