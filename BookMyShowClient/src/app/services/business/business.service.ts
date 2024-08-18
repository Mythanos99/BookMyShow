import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { httpError } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  apiUrl:string=environment.apiUrl;
  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  AddBusiness(business:any):Observable<any>{
    return this.http.post(this.apiUrl+'/business',business,this.httpHeader)
    .pipe(catchError(httpError));
  }
  fetchAccess(id:string):Observable<any>{
    return this.http.get(this.apiUrl+'/business/access/'+id,this.httpHeader)
    .pipe(catchError(httpError));
  }
  reapplyPermission(id:string):Observable<any>{
    return this.http.put(this.apiUrl+'/business/reapply/'+id,this.httpHeader)
    .pipe(catchError(httpError));
  }
  fetchAllAppliedBusiness(page:number=0,limit:number=10):Observable<any>{
    return this.http.get(this.apiUrl+'/business?page='+page+'&limit='+limit,this.httpHeader)
    .pipe(catchError(httpError));
  }
  updateBusinessAccess(id:String,access:any):Observable<any>{
    return this.http.put(this.apiUrl+'/business/update-access/'+id,access,this.httpHeader)
    .pipe(catchError(httpError));
  }
}
