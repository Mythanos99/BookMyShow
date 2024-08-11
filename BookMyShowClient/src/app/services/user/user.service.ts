import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { httpError } from '../utils/utils';
import { catchError, Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl:string=environment.apiUrl;
  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  register(payload:User):Observable<Response>{
    return this.http.post<Response>(this.apiUrl+'/users',payload,this.httpHeader)
    .pipe(catchError(httpError));;
  }
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`,this.httpHeader)
    .pipe(catchError(httpError));
  }
  updateUserById(id: string, payload: User): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/users/${id}`, payload, this.httpHeader)
    .pipe(catchError(httpError));
  }
}
