import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@guard/auth.guard';
import { AddEditComponent } from '@shared/add-edit/add-edit.component';
import { AdminDetailsComponent } from './admin-details/admin-details.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CategoryComponent } from './category/category.component';
import { PostTypeComponent } from './post-type/post-type.component';
import { PostsComponent } from './posts/posts.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { TypeCategoryComponent } from './type-category/type-category.component';

const routes: Routes = [
  { path: 'authentication', component: AuthenticationComponent },
  {
    path: 'admin-details', canActivate: [AuthGuard],
    children: [
      { path: '', component: AdminDetailsComponent },
      { path: 'add', component: AddEditComponent },
      { path: 'edit', component: AddEditComponent }
    ]
  },
  {
    path: 'category', canActivate: [AuthGuard],
    children: [
      { path: '', component: CategoryComponent },
      { path: 'add', component: AddEditComponent },
      { path: 'edit', component: AddEditComponent }
    ]
  },
  {
    path: 'sub-category', canActivate: [AuthGuard],
    children: [
      { path: '', component: SubCategoryComponent },
      { path: 'add', component: AddEditComponent },
      { path: 'edit', component: AddEditComponent }
    ]
  },
  {
    path: 'type-category', canActivate: [AuthGuard],
    children: [
      { path: '', component: TypeCategoryComponent },
      { path: 'add', component: AddEditComponent },
      { path: 'edit', component: AddEditComponent }
    ]
  },
  {
    path: 'post-type', canActivate: [AuthGuard],
    children: [
      { path: '', component: PostTypeComponent },
      { path: 'add', component: AddEditComponent },
      { path: 'edit', component: AddEditComponent }
    ]
  },
  { path: 'posts', component: PostsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
