import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { httpError } from '../utils/utils';
import { catchError, Observable } from 'rxjs';
import { Filters, Movie } from 'src/app/models/movie';

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
    return this.http.get<Movie[]>(`${this.apiUrl}/movies?${queryParams}`,this.httpHeader)
    .pipe(catchError(httpError));
  }
  getMovieById(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/movies/${id}`,this.httpHeader)
    .pipe(catchError(httpError));
  }
  getMovieFilters(queryParams: string): Observable<Filters> {
    return this.http.get<Filters>(`${this.apiUrl}/movies/filters?${queryParams}`,this.httpHeader);
  }
  getUpcomingMovies(queryParams: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies/upcoming?${queryParams}`,this.httpHeader)
    .pipe(catchError(httpError));
  }
  UploadMovie(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/movies`, formData)
    .pipe(catchError(httpError));
  }
}
