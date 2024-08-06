import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { httpError } from '../utils/utils';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  apiUrl:string=environment.apiUrl;
  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  VerifyBookingDetails(id:string,bookingDetails:any):Observable<any>{
    return this.http.post<any>(this.apiUrl+'/booking/'+id,bookingDetails,this.httpHeader)
  }
  BookTickets(bookingDetails:any):Observable<any>{
    return this.http.post<any>(this.apiUrl+'/booking',bookingDetails,this.httpHeader)
  }
}

// #FIXME- convert these response and request to correct types.
