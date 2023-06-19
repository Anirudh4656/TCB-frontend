import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryModel } from '@model/admin/category.model';
import { SubCategoryModel } from '@model/admin/sub-category.model';
import { TypeCategoryModel } from '@model/admin/type-category.model';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetAllCategory } from 'src/app/core/store/action/category.action';
import {
  AddPost,
  DeletePost,
  GetAllPosts,
  UpdatePost,
} from 'src/app/core/store/action/posts.action';
import { GetAllSubCategory } from 'src/app/core/store/action/sub-category.action';
import { GetAllTypeCategory } from 'src/app/core/store/action/type-category.action';
import { CategoryState } from 'src/app/core/store/state/category.state';
import { SubCategoryState } from 'src/app/core/store/state/sub-category.state';
import { TypeCategoryState } from 'src/app/core/store/state/type-category.state';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { PostsState } from 'src/app/core/store/state/posts.state';
import { GetPostsModel } from '@model/public/posts/get-posts.model';

@Component({
  selector: 'tcb-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  // for HTML Editor
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '200px',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      { name: 'quote', class: 'quote' },
      { name: 'redText', class: 'redText' },
      { name: 'titleText', class: 'titleText', tag: 'h1' },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
  };
  editPost: any;
  editMode: boolean;
  file:File;
  imageUrl: string | ArrayBuffer;

  constructor(private fb: FormBuilder, private store: Store) {}

  createPost: FormGroup;
  show: boolean = false;
  @Select(PostsState.getPostsList) postList$: Observable<GetPostsModel[]>;
  @Select(CategoryState.getCategoryList) categoryList$: Observable<
    CategoryModel[]
  >;
  @Select(SubCategoryState.getSubCategoryList) subCategoryList$: Observable<
    SubCategoryModel[]
  >;
  @Select(TypeCategoryState.getTypeCategoryList) typeCategoryList$: Observable<
    TypeCategoryModel[]
  >;

  ngOnInit(): void {
    this.createForm();
    this.store.dispatch(new GetAllCategory());
    this.store.dispatch(new GetAllSubCategory());
    this.store.dispatch(new GetAllTypeCategory());
    this.store.dispatch(new GetAllPosts());
  }

  createForm() {
    this.createPost = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: [],
      blog_content: ['', Validators.required],
      youtube_video_link: [''],
      tags: ['Science, Comedy'],
      author: ['', Validators.required],
      likes: [0],
      comments: [0],
      category_id: ['', Validators.required],
      sub_category_id: ['', Validators.required],
      type_category_id: ['', Validators.required],
    });
  }

  onSubmit() {
    this.store.dispatch(new AddPost(this.createPost.value));
    this.createPost.reset();
  }
  onUpdate(){
    this.store.dispatch(new UpdatePost(this.editPost.id, this.createPost.value));
    this.store.dispatch(new GetAllPosts());
  }
  onDelete(id) {
    this.store.dispatch(new DeletePost(id));
    this.store.dispatch(new GetAllPosts());
  }
  DeletePost

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.createPost.patchValue({ image: file });
    
  }

  addClick(){
    this.show = true;
    this.editMode = false;
    this.createPost.reset();
  }

  editClick(item) {
    this.show = true;
    this.editMode = true;
    this.editPost = item;
    this.createPost.patchValue({
      title: item.title,
      description: item.description,
      image: item.image,
      blog_content: item.blog_content,
      youtube_video_link: item.youtube_video_link,
      tags: item.tags,
      author: item.author,
      likes: item.likes,
      comments: item.comments,
      category_id: item.category.id,
      sub_category_id: item.sub_category.id,
      type_category_id: item.type_category.id,
   
    });
   
  
  }
}
