import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private userIdSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private BusinessIdSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  constructor() { }

  getUserId(): Observable<string | null> {
    var localId=localStorage.getItem('userId');
    if(localId){
      this.userIdSubject.next(localId);
    }
    return this.userIdSubject.asObservable();
  }

  // Update the userId and notify all subscribers
  setUserId(userId: string): void {
    this.userIdSubject.next(userId);
    localStorage.setItem('userId', userId);
    console.log('User ID set:', userId);
  }
  
  getCurrentUserId(): string | null {
    return this.userIdSubject.value;
  }
  signout(){
    localStorage.removeItem('userId');
    this.clearCookie('jwtToken');
    this.userIdSubject.next(null);
  }
  private clearCookie(name: string) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
  getBusinessId(): Observable<string | null> {
    var localId=localStorage.getItem('businessId');
    if(localId){
      this.BusinessIdSubject.next(localId);
    }
    return this.BusinessIdSubject.asObservable();
  }

  setBusinessId(businessId: string): void {
    this.BusinessIdSubject.next(businessId);
    localStorage.setItem('businessId', businessId);
    console.log('Business ID set:', businessId);
  }
  signoutBusiness(){
    localStorage.removeItem('businessId');
    this.clearCookie('jwtTokenBusiness');
    this.BusinessIdSubject.next(null);
  }
}
