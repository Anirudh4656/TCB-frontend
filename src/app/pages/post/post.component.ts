import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap ,Router} from '@angular/router';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { GetPostsModel } from '@model/public/posts/get-posts.model';
import { GetAllPosts, GetPost } from '@store/action/posts.action';
import { PostsState } from '@store/state/posts.state';
import { HttpClientService } from '@service/http-client.service';

@Component({
  selector: 'tcb-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private store: Store,private router:Router, public sanitizer: DomSanitizer,
    private _http: HttpClientService) { }

  @Select(PostsState.getPost) post$: Observable<GetPostsModel>;
  @Select(PostsState.getPostsList) postsList$: Observable<GetPostsModel[]>;
  post: GetPostsModel;
  safeLink: SafeResourceUrl;
  postID: string = '';
  tags: string[] = [];

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('id')) {
        this.postID = paramMap.get('id');
      }
      
      this._http.getSinglePost(this.postID).subscribe(response => {
       
        this.post = response?.data;
        this.setSlug();
        this.safeLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.post.youtube_video_link.replace('watch?v=', 'embed/'));
       
      });
      this._http.increasePostView(this.postID);
      this.store.dispatch(new GetAllPosts());
      
    });
  }
  dasherize(string: string) {
    return string.replace(/[ ]/g, '-').toLowerCase();
  }
  setSlug() {
    const postSlug = this.activatedRoute.snapshot.params.slug;
    if (!postSlug) {
      console.log(`i am in slug ${this.post.title}`)
      let slug = this.dasherize(this.post.title);
      this.router
        .navigate([slug], { relativeTo: this.activatedRoute, replaceUrl: true })
        .then();
    }
  }
}
