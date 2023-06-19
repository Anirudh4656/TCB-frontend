import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { GetPostsModel } from "@model/public/posts/get-posts.model";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { HttpClientService } from "@service/http-client.service";
import { NotificationService } from "@service/notification.service";
import { tap } from "rxjs/operators";
import { LogoutAction } from "../action/logout.action";
import { AddPost, DeletePost, GetAllPosts, GetPost, UpdatePost } from "../action/posts.action";

export interface PostsStateModel {
    postsList: GetPostsModel[];
    post: GetPostsModel;
}

@State<PostsStateModel>({
    name: 'posts',
    defaults: {
        postsList: [],
        post: null
    }
})

@Injectable()
export class PostsState {

    constructor(private zone: NgZone,private router: Router,private _http: HttpClientService, private _notificationService: NotificationService) {}

    @Action(AddPost)
    addPosts({ getState, setState }: StateContext<PostsStateModel>, { payload }: AddPost) {
        return this._http.addPost(payload).pipe(tap(response => {
            setState({ ...getState(), postsList: [ ...getState().postsList, response.data ]});
            // this._notificationService.notification$.next({ message: response.message, action: 'SUCCESS', panelClass: 'success' });
            alert(`SUCCESS: ${response.message}`);
        }));
    }

    @Selector()
    static getPostsList(state: PostsStateModel) {
        return state.postsList;
    }

    @Action(GetAllPosts)
    getAllPosts({ getState, setState }: StateContext<PostsStateModel>) {
        if(!getState().postsList.length) {
            return this._http.getAllPosts().pipe(tap(response => setState({ ...getState(), postsList: response.data })));
        }
    }

    @Selector()
    static getPost(state: PostsStateModel) {
        return state.post;
    }

    @Action(GetPost)
    getSinglePost({ getState, setState }: StateContext<PostsStateModel>, { id }: GetPost) {
        const state = getState();
        if(!state.postsList.length) {
            return this._http.getSinglePost(id).pipe(tap(response => setState({ ...state, post: response.data })));
        }
        setState({ ...state, post: state.postsList.find(post => post.id === id) });
    }
    @Action(UpdatePost)
    UpdatePost({ getState, patchState,setState }: StateContext<PostsStateModel>, { id, payload }: UpdatePost) {
      
        return this._http.modifyPost(payload, id).pipe(tap(response => {
            const state = getState();
            const postsList = [...state.postsList];
            const index = postsList.findIndex(post => post.id === id);
            postsList[index] = response.data;
            patchState({ postsList: postsList });
            // this._notificationService.notification$.next({ message: response.message, action: 'SUCCESS', panelClass: 'success' });
            alert(`SUCCESS: ${response.message}`);
            this.zone.run(() => this.router.navigate(["/admin/posts"]));
        }));
    }
    @Action(DeletePost)
    deletePostType({ getState, setState }: StateContext<PostsStateModel>, { id }: DeletePost) {
        return this._http.deletePost(id).pipe(tap(response => {
            const state = getState();
            setState({
                ...state,
                postsList: state.postsList.filter(post => post.id !== id)
            });
            // this._notificationService.notification$.next({ message: response.message, action: 'INFO', panelClass: 'info' });
            alert(`INFO: ${response.message}`);
        }));
    }

    @Action(LogoutAction)
    resetState({ patchState }: StateContext<PostsStateModel>) {
        patchState({ postsList: [] });
    }
}
