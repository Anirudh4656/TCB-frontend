import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';
// Models
import { CategoryModel } from '@model/admin/category.model';
import { PostTypeModel } from '@model/admin/post-type.model';
import { GetPostsModel } from '@model/public/posts/get-posts.model';
// Actions
import { GetAllCategory } from '@store/action/category.action';
import { GetAllPostType } from '@store/action/post-type.action';
// import { GetAllPosts } from '@store/action/posts.action';
// State
import { CategoryState } from '@store/state/category.state';
import { PostTypeState } from '@store/state/post-type.state';
// import { PostsState } from '@store/state/posts.state';
import { HttpClientService } from '@service/http-client.service';

@Component({
  selector: 'tcb-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private store: Store, private _http: HttpClientService) { }

  postsList: GetPostsModel[] = [];

  // @Select(PostsState.getPostsList) postsList$: Observable<GetPostsModel[]>;
  @Select(PostTypeState.getPostTypeList) postTypeList$: Observable<PostTypeModel[]>;
  @Select(CategoryState.getCategoryList) categoryList$: Observable<CategoryModel[]>;

  async ngOnInit() {
    // await this.store.dispatch(new GetAllPosts());
    this.postsList = await (await this._http.getAllPosts().toPromise()).data;
    this.store.dispatch(new GetAllPostType());
    this.store.dispatch(new GetAllCategory());
    // this.postsList$.subscribe(posts => this.postsList = posts);
  }
}
