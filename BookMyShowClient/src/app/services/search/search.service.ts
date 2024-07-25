import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { httpError } from '../utils/utils';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  apiUrl: string = environment.apiUrl;
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  search(city: string, query: string): Observable<any> {
    const url = `${this.apiUrl}/search`;
    return this.http.get<any>(url, {
      ...this.httpHeader,
      params: {
        city,
        search: query
      }
    }).pipe(catchError(httpError));
  }
}