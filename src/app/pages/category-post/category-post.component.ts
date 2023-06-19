import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CategoryModel } from '@model/admin/category.model';
import { SubCategoryModel } from '@model/admin/sub-category.model';
import { GetPostsModel } from '@model/public/posts/get-posts.model';
import { Select, Store } from '@ngxs/store';
import { GetAllCategory } from '@store/action/category.action';
import { GetAllPosts } from '@store/action/posts.action';
import { GetAllSubCategory } from '@store/action/sub-category.action';
import { CategoryState } from '@store/state/category.state';
import { PostsState } from '@store/state/posts.state';
import { SubCategoryState } from '@store/state/sub-category.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'tcb-category-post',
  templateUrl: './category-post.component.html',
  styleUrls: ['./category-post.component.css']
})
export class CategoryPostComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private store: Store) { }

  category: string = '';
  sub_category:string = '';
  @Select(PostsState.getPostsList) postsList$: Observable<GetPostsModel[]>;
  @Select(CategoryState.getCategoryList) categoryList$: Observable<CategoryModel[]>;
  @Select(SubCategoryState.getSubCategoryList) subcategoryList$: Observable<SubCategoryModel[]>;
  
  async ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) =>{
      this.category = paramMap.get('category'),
      this.sub_category = paramMap.get('sub_category')
  }); 
      
    await this.store.dispatch(new GetAllPosts());
    await this.store.dispatch(new GetAllCategory());
    await this.store.dispatch(new GetAllSubCategory());
  }
}
