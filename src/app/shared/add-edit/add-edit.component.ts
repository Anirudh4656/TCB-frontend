import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddAdminUser, UpdateAdminUser } from '@store/action/admin-user.action';
import { AddCategory, UpdateCategory } from 'src/app/core/store/action/category.action';
import { AddPostType, UpdatePostType } from 'src/app/core/store/action/post-type.action';
import { AddSubCategory, UpdateSubCategory } from 'src/app/core/store/action/sub-category.action';
import { AddTypeCategory, UpdateTypeCategory } from 'src/app/core/store/action/type-category.action';

@Component({
  selector: 'tcb-add-edit',
  templateUrl: './add-edit.component.html'
})
export class AddEditComponent implements OnInit {

  constructor(private store: Store) { }

  data: any;

  ngOnInit(): void {
    if(!sessionStorage.getItem('data')) {
      sessionStorage.setItem('data', JSON.stringify(history.state.data))
    }
    this.data = JSON.parse(sessionStorage.getItem('data'));
  }

  action(flag: string) {
    switch (flag) {
      case 'Addadmin-details':
        this.store.dispatch(new AddAdminUser(this.data));
        break;
      case 'Editadmin-details':
        this.store.dispatch(new UpdateAdminUser(this.data.id, this.data));
        break;
      case 'Addcategory':
        this.store.dispatch(new AddCategory(this.data));
        break;
      case 'Editcategory':
        this.store.dispatch(new UpdateCategory(this.data.id, this.data));
        break;
      case 'Addsub-category':
        this.store.dispatch(new AddSubCategory(this.data));
        break;
      case 'Editsub-category':
        this.store.dispatch(new UpdateSubCategory(this.data.id, this.data));
        break;
      case 'Addtype-category':
        this.store.dispatch(new AddTypeCategory(this.data));
        break;
      case 'Edittype-category':
        this.store.dispatch(new UpdateTypeCategory(this.data.id, this.data));
        break;
      case 'Addpost-type':
        this.store.dispatch(new AddPostType(this.data));
        break;
      case 'Editpost-type':
        this.store.dispatch(new UpdatePostType(this.data.id, this.data));
        break;
    }
  }
}