import { Component } from '@angular/core';
import { AdminAuthService } from '@service/admin-auth.service';

@Component({
  selector: 'tcb-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(public _adminAuthService: AdminAuthService) { }

  year = new Date().getFullYear();
  icons = [ 'youtube', 'facebook', 'instagram', 'twitter' ];
}
