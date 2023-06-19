import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { AngularMaterialModule } from 'src/app/material/angular-material.module';

// States
import { AdminUserState } from '@store/state/admin-user.state';
import { CategoryState } from '@store/state/category.state';
import { SubCategoryState } from '@store/state/sub-category.state';
import { TypeCategoryState } from '@store/state/type-category.state';
import { PostTypeState } from '@store/state/post-type.state';
import { PostsState } from '@store/state/posts.state';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AdminDetailsComponent } from './admin-details/admin-details.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CategoryComponent } from './category/category.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { TypeCategoryComponent } from './type-category/type-category.component';
import { PostsComponent } from './posts/posts.component';
import { PostTypeComponent } from './post-type/post-type.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AddEditComponent } from '@shared/add-edit/add-edit.component';

//HTML Editor


@NgModule({
  declarations: [
    AdminDetailsComponent,
    AuthenticationComponent,
    CategoryComponent,
    SubCategoryComponent,
    TypeCategoryComponent,
    PostsComponent,
    PostTypeComponent,
    AddEditComponent
  ],
  imports: [
    CommonModule, RouterModule, FormsModule, ReactiveFormsModule,
    AngularMaterialModule, AdminRoutingModule,
    AngularEditorModule,
    NgxsModule.forFeature([
      AdminUserState, CategoryState, SubCategoryState, TypeCategoryState, PostTypeState, PostsState
    ])
  ],
  providers: []
})
export class AdminModule { }
