import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AdminUserModel } from '@model/admin/admin-user.model';
import { CategoryModel } from '@model/admin/category.model';
import { TypeCategoryModel } from '@model/admin/type-category.model';
import { SubCategoryModel } from '@model/admin/sub-category.model';
import { PostTypeModel } from '@model/admin/post-type.model';
import { ChannelDetailsModel } from '@model/channel-details.model';
import { ManipulatePostModel } from '@model/public/posts/manipulate -post.model';
import { GetPostsModel } from '@model/public/posts/get-posts.model';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  /**
   * @created by Avishek Datta Ray on Jul 11, 2021
   * @project The Choice Box
  */

  constructor(private http: HttpClient) { }
  private readonly ADMIN_URL: string = environment.ADMIN_API_URL;
  private readonly PUBLIC_URL: string = environment.PUBLIC_API_URL;

  // Admin Authentication
  adminRegistration(data: AdminUserModel) {
    // const postData = new FormData();
    // postData.append('name', data.name);
    // postData.append('emailId', data.emailId);3
    // postData.append('password', data.password);
    // postData.append('role', data.role);
    // postData.append('image', data.image, 'admin');
    return this.http.post<{ message: string, data: AdminUserModel, path: string }>(`${this.ADMIN_URL}/auth/register`, data);
  }

  adminLogin(data: object) {
    return this.http.post<{ message: string, data: { username: string, accessToken: string } }>(`${this.ADMIN_URL}/auth/login`, data);
  }

  // Admin Details
  getAllAdmin() {
    return this.http.get<{ data: AdminUserModel[], message: string }>(`${this.ADMIN_URL}/adminDetails/getAll`);
  }

  modifyAdmin(data: AdminUserModel, id: string) {
    return this.http.put<{ message: string, path: string }>(`${this.ADMIN_URL}/adminDetails/update/${id}`, data);
  }

  deleteAdmin(id: string) {
    return this.http.delete<{ message: string }>(`${this.ADMIN_URL}/adminDetails/delete/${id}`);
  }

  // Category
  addCategory(data: CategoryModel) {
    return this.http.post<{ data: CategoryModel, message: string, path: string }>(`${this.ADMIN_URL}/category/create`, data)
  }

  getCategory() {
    return this.http.get<{ data: CategoryModel[], message: string }>(`${this.ADMIN_URL}/category/getAll`);
  }

  modifyCategory(data: CategoryModel, id: string) {
    return this.http.put<{ message: string, path: string }>(`${this.ADMIN_URL}/category/update/${id}`, data);
  }

  deleteCategory(id: string) {
    return this.http.delete<{ message: string }>(`${this.ADMIN_URL}/category/delete/${id}`);
  }

  // Type Category
  addTypeCategory(data: TypeCategoryModel) {
    return this.http.post<{ data: TypeCategoryModel, message: string, path: string }>(`${this.ADMIN_URL}/type_category/create`, data)
  }
  getTypeCategory() {
    return this.http.get<{ data: TypeCategoryModel[], message: string }>(`${this.ADMIN_URL}/type_category/getAll`);
  }

  modifyTypeCategory(data: TypeCategoryModel, id: string) {
    return this.http.put<{ message: string, path: string }>(`${this.ADMIN_URL}/type_category/update/${id}`, data);
  }

  deleteTypeCategory(id: string) {
    return this.http.delete<{ message: string }>(`${this.ADMIN_URL}/type_category/delete/${id}`);
  }

  // Sub Category
  addSubCategory(data: SubCategoryModel) {
    return this.http.post<{ data: SubCategoryModel, message: string, path: string }>(`${this.ADMIN_URL}/sub_category/create`, data)
  }

  getSubCategory() {
    return this.http.get<{ data: SubCategoryModel[], message: string }>(`${this.ADMIN_URL}/sub_category/getAll`);
  }

  modifySubCategory(data: SubCategoryModel, id: string) {
    return this.http.put<{ message: string, path: string }>(`${this.ADMIN_URL}/sub_category/update/${id}`, data);
  }

  deleteSubCategory(id: string) {
    return this.http.delete<{ message: string }>(`${this.ADMIN_URL}/sub_category/delete/${id}`);
  }

  // Post Type 
  addPostType(data: PostTypeModel) {
    return this.http.post<{ data: PostTypeModel, message: string, path: string }>(`${this.ADMIN_URL}/post_type/create`, data)
  }
  
  getPostType() {
    return this.http.get<{ data: PostTypeModel[], message: string }>(`${this.ADMIN_URL}/post_type/getAll`);
  }

  modifyPostType(data: PostTypeModel, id: string) {
    return this.http.put<{ message: string, path: string }>(`${this.ADMIN_URL}/post_type/update/${id}`, data);
  }

  deletePostType(id: string) {
    return this.http.delete<{ message: string }>(`${this.ADMIN_URL}/post_type/delete/${id}`);
  }

  // Channel Details
  addChanelDetail(data: ChannelDetailsModel) {
    return this.http.post<{ message: string }>(`${this.ADMIN_URL}/channel_details/create`, data)
  }

  getChanelDetail() {
    return this.http.get<{ data: ChannelDetailsModel[], message: string }>(`${this.ADMIN_URL}/channel_details/getAll`);
  }

  modifyChanelDetail(data: ChannelDetailsModel, id: string) {
    return this.http.put<{ message: string }>(`${this.ADMIN_URL}/channel_details/update/${id}`, data);
  }

  deleteChanelDetail(id: string) {
    return this.http.delete<{ message: string }>(`${this.ADMIN_URL}/channel_details/delete/${id}`);
  }

  // Public Posts
  addPost(data: ManipulatePostModel) {
    const postData = new FormData();
    for(var ele in data) {
      if(data.hasOwnProperty(ele)) {
        if(ele !== 'image') {
          postData.append(ele, data[ele]);
        } else {
          const blob = new Blob([data[ele]], { type: 'image/png' });
          postData.append(ele, blob, data.title);
        }
      }
    }
    return this.http.post<{ message: string, data: GetPostsModel }>(`${this.PUBLIC_URL}/posts/create`, postData);
  }

  getAllPosts() {
    return this.http.get<{ data: GetPostsModel[], message: string }>(`${this.PUBLIC_URL}/posts/getAll`);
  }
  
  getSinglePost(id: string) {
    return this.http.get<{ data: GetPostsModel, message: string }>(`${this.PUBLIC_URL}/posts/get/${id}`);
  }

  modifyPost(data: ManipulatePostModel, id: string) {
    const postData = new FormData();
    for(var ele in data) {
      if(data.hasOwnProperty(ele)) {
        if(ele !== 'image') {
          postData.append(ele, data[ele]);
        } else {
          postData.append(ele, data[ele], data.title);
        }
      }
    }
    return this.http.put<{ message: string, data: GetPostsModel }>(`${this.PUBLIC_URL}/posts/update/${id}`, postData);
  }

  deletePost(id: string) {
    return this.http.delete<{ message: string }>(`${this.PUBLIC_URL}/posts/delete/${id}`);
  }

  searchPost(keyword: string) {
    return this.http.get<{ data: GetPostsModel[], message: string }>(`${this.PUBLIC_URL}/posts/search/${keyword}`);
  }

  increasePostView(id: string) {
    this.http.get<{ message: string }>(`${this.PUBLIC_URL}/posts/updateView/${id}`)
    .subscribe(response => console.info(response.message));
  }
}
