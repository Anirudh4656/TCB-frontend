import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminAuthService } from '@service/admin-auth.service';
import { NotificationService } from '@service/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor(private _adminAuthService: AdminAuthService, private router: Router, private _notificationService: NotificationService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this._adminAuthService.isUserLoggedIn()) {
      // this._notificationService.notification$.next({ message: 'Authentication Required', action: 'WARNING', panelClass: 'warning' });
      alert('WARNING: Authentication Required');
      return this.router.navigate(['/admin/authentication'], { queryParams: { 'redirectURL': state.url } });
    }
    return this._adminAuthService.isUserLoggedIn();
  }
}
