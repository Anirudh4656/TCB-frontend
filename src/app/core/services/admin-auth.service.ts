import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NotificationService } from './notification.service';
import { Store } from '@ngxs/store';
import { LogoutAction } from '../store/action/logout.action';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  /**
   * @created by Avishek Datta Ray on Jul 11, 2021
   * @project The Choice Box
  */

  private readonly url: string = environment.ADMIN_API_URL;
  private authStatusListener = new Subject<boolean>();
  getLoggedInInfo = new Subject<{ username: string }>();
  tokenTimer: any;

  constructor(private http: HttpClient, private router: Router, private store: Store, private _notificationService: NotificationService) {}

  async loginUser(authData: { emailId: string, password: string }) {
    let response = await this.http.post<{ message: string, path: string, data: { username: string, accessToken: string, expiresIn: number } }>(`${this.url}/auth/login`, authData).toPromise();
    this.tokenTimer = setTimeout(() => {
      this.logout();
      // this._notificationService.notification$.next({ message: 'Session Timeout !! Login Again', action: 'ERROR', panelClass: 'danger' });
      alert('ERROR: Session Timeout !! Login Again');
    }, response.data.expiresIn);
    this.authStatusListener.next(true);
    this.saveAuthData(response.data.accessToken, response.data.username, new Date(new Date().getTime() + response.data.expiresIn*1000));
    this.getLoggedInInfo.next({ username: response.data.username });
    this.router.navigate([response.path]);
  }

  isUserLoggedIn() {
    return !(sessionStorage.getItem('token')===null);
  }

  logout() {
    sessionStorage.clear();
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.store.dispatch(new LogoutAction());
    this.router.navigate(['/admin/authentication']);
  }

  private saveAuthData(token: string, userName: string, expireTime: Date) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('username', userName);
    sessionStorage.setItem('expireTime', expireTime.toISOString());
  }
}