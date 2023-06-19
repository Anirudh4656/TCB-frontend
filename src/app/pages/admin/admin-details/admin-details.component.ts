import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AdminUserModel } from '@model/admin/admin-user.model';
import { Store, Select } from '@ngxs/store';
import { HttpClientService } from '@service/http-client.service';
import { GetAllAdminUsers, DeleteAdminUser } from '@store/action/admin-user.action';
import { AdminUserState } from '@store/state/admin-user.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'tcb-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.css']
})
export class AdminDetailsComponent implements OnInit {

  constructor(private store: Store, private fb: FormBuilder, private service: HttpClientService) { }
  
  @Select(AdminUserState.getAdminUsersList) adminUserList$: Observable<AdminUserModel[]>;

  ngOnInit(): void {
    this.store.dispatch(new GetAllAdminUsers());
  }

  onDelete(id: string) {
    if(confirm('Are you sure to delete?')) {
      this.store.dispatch(new DeleteAdminUser(id));
    }
  }

}
