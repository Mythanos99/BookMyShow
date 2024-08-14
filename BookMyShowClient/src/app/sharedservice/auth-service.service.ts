import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private userIdSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor() { }

  getUserId(): Observable<string | null> {
    return this.userIdSubject.asObservable();
  }

  // Update the userId and notify all subscribers
  setUserId(userId: string): void {
    this.userIdSubject.next(userId);
    console.log('User ID set:', userId);
  }
  
  getCurrentUserId(): string | null {
    return this.userIdSubject.value;
  }
  signout(){
    this.userIdSubject.next(null);
  }
}
