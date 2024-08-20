import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../sharedservice/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private authService:AuthServiceService
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const userId = this.authService.getCurrentUserId();
      return userId !== null;
  }
  
}
@Injectable({
  providedIn: 'root'  
})
export class BusinessGuard implements CanActivate {
  constructor(
    private authService:AuthServiceService
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const businessId = this.authService.getCurrentBusinessId();
      return businessId !== null;
  }
  
}
