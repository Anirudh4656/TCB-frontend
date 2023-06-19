import { Component, OnInit } from '@angular/core';
import { PostTypeModel } from '@model/admin/post-type.model';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DeletePostType, GetAllPostType } from 'src/app/core/store/action/post-type.action';
import { PostTypeState } from 'src/app/core/store/state/post-type.state';

@Component({
  selector: 'tcb-post-type',
  templateUrl: './post-type.component.html',
  styleUrls: ['./post-type.component.css']
})
export class PostTypeComponent implements OnInit {

  constructor(private store: Store) { }
  @Select(PostTypeState.getPostTypeList) postTypeList$: Observable<PostTypeModel[]>;

  ngOnInit(): void {
    this.store.dispatch(new GetAllPostType());
  }

  onDelete(id: string) {
    if(confirm('Are you sure to delete?')) {
      this.store.dispatch(new DeletePostType(id));
    }
  }
}
