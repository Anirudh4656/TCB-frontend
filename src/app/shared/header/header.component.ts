import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { CategoryModel } from '@model/admin/category.model';
import { SubCategoryModel } from '@model/admin/sub-category.model';
import { Select, Store } from '@ngxs/store';
import { AdminAuthService } from '@service/admin-auth.service';
import { GetAllCategory } from '@store/action/category.action';
import { GetAllPosts } from '@store/action/posts.action';
import { GetAllSubCategory } from '@store/action/sub-category.action';
import { CategoryState } from '@store/state/category.state';
import { SubCategoryState } from '@store/state/sub-category.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'tcb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  navHide = true;
  search = '';
  showAdmin = false;
  show = false;
  userName = sessionStorage.getItem('username');
  adminNavMenu = [
    { name: 'ADMIN DETAILS', path: '/admin/admin-details' }, { name: 'CATEGORY', path: '/admin/category' },
    { name: 'SUB CATEGORY', path: '/admin/sub-category' }, { name: 'TYPE CATEGORY', path: '/admin/type-category' },
    { name: 'POST TYPE', path: '/admin/post-type' }, { name: 'POSTS', path: '/admin/posts' }
  ];
  navMenu = [
    { name: 'MOVIE NEWS', path: 'Movies' }, { name: 'Webseries/TV NEWS', path: 'Webseries/TV Shows' },
    { name: 'REVIEWS', path: 'Reviews' }, { name: 'LIST', path: 'List' }
  ];
  @Select(CategoryState.getCategoryList) categoryList$: Observable<CategoryModel[]>;
  @Select(SubCategoryState.getSubCategoryList) subcategoryList$: Observable<SubCategoryModel[]>;
  constructor(public _adminAuthService: AdminAuthService, private router: Router, private store: Store) {
    _adminAuthService.getLoggedInInfo.subscribe(info => this.userName = info.username);
    this.router.events.subscribe(value => {
      if (value instanceof NavigationStart) {
        if (value.url.includes("/admin/") && value.url != "/admin/authentication") {
          this.showAdmin = true;
        }
        else {
          this.showAdmin = false;
        }
      }
    });

  }

  ngOnInit() {
    this.getAllCat();
  }

  async getAllCat() {
    await this.store.dispatch(new GetAllCategory());
    await this.store.dispatch(new GetAllSubCategory());
  }

  async searchRecord() {
    this.show = false;
    this.router.navigate(['search', this.search]);
  }
}
