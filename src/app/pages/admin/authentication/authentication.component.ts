import { Component } from '@angular/core';
import { AdminAuthService } from '@service/admin-auth.service';

@Component({
  selector: 'tcb-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {

  constructor(private _adminAuthService: AdminAuthService) { }

  loginInfo = { emailId: '', password: '' };

  login() {
    this._adminAuthService.loginUser(this.loginInfo);
  }
}
