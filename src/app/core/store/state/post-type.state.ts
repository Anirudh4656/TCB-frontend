import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { Injectable, NgZone } from "@angular/core";
import { HttpClientService } from "@service/http-client.service";
import { PostTypeModel } from "@model/admin/post-type.model";
import { AddPostType, DeletePostType, GetAllPostType, UpdatePostType } from "../action/post-type.action";
import { NotificationService } from "@service/notification.service";
import { Router } from "@angular/router";
import { LogoutAction } from "../action/logout.action";

export interface PostTypeStateModel {
    postTypeList: PostTypeModel[];
}

@State<PostTypeStateModel>({
    name: 'postType',
    defaults: {
        postTypeList: []
    }
})

@Injectable()
export class PostTypeState {

    constructor(private zone: NgZone, private router: Router, private _http: HttpClientService, private _notificationService: NotificationService) {}

    @Action(AddPostType)
    addPostType({ getState, setState }: StateContext<PostTypeStateModel>, { payload }: AddPostType) {
        return this._http.addPostType(payload).pipe(tap(response => {
            setState({ ...getState(), postTypeList: [ ...getState().postTypeList, response.data ] });
            // this._notificationService.notification$.next({ message: response.message, action: 'SUCCESS', panelClass: 'success' });
            alert(`SUCCESS: ${response.message}`);
            this.zone.run(() => this.router.navigate([response.path]));
        }));
    }

    @Selector()
    static getPostTypeList(state: PostTypeStateModel) {
        return state.postTypeList;
    }

    @Action(GetAllPostType)
    getAllPostTypes({ getState, setState }: StateContext<PostTypeStateModel>) {
        if(!getState().postTypeList.length) {
            return this._http.getPostType().pipe(tap(response => {
                setState({ ...getState(), postTypeList: response.data });
            }));
        }
    }

    @Action(UpdatePostType)
    updatePostType({ getState, patchState }: StateContext<PostTypeStateModel>, { id, payload }: UpdatePostType) {
        return this._http.modifyPostType(payload, id).pipe(tap(response => {
            const state = getState();
            const postTypeList = [...state.postTypeList];
            const index = postTypeList.findIndex(type => type.id === id);
            postTypeList[index] = { ...payload, id: id };
            patchState({ postTypeList: postTypeList });
            // this._notificationService.notification$.next({ message: response.message, action: 'SUCCESS', panelClass: 'success' });
            alert(`SUCCESS: ${response.message}`);
            this.zone.run(() => this.router.navigate([response.path]));
        }));
    }

    @Action(DeletePostType)
    deletePostType({ getState, setState }: StateContext<PostTypeStateModel>, { id }: DeletePostType) {
        return this._http.deletePostType(id).pipe(tap(response => {
            const state = getState();
            setState({
                ...state,
                postTypeList: state.postTypeList.filter(type => type.id !== id)
            });
            // this._notificationService.notification$.next({ message: response.message, action: 'INFO', panelClass: 'info' });
            alert(`INFO: ${response.message}`);
        }));
    }
    
    @Action(LogoutAction)
    resetState({ patchState }: StateContext<PostTypeStateModel>) {
        patchState({ postTypeList: [] });
    }
}
