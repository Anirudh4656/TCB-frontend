import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GetPostsModel } from '@model/public/posts/get-posts.model';
import { Store, Select } from '@ngxs/store';
import { GetAllPosts } from '@store/action/posts.action';
import { PostsState } from '@store/state/posts.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'tcb-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  constructor(private store: Store, private activatedRoute:ActivatedRoute) { }
  
  search = '';
  hide = false;
  postsList: GetPostsModel[] = [];
  @Select(PostsState.getPostsList) postsList$: Observable<GetPostsModel[]>;

  async ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) =>{
      this.search = paramMap.get('keyword')
  }); 
    await this.store.dispatch(new GetAllPosts());
    this.hide = true;
  }
}
