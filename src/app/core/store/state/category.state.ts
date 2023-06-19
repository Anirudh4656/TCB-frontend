import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { Injectable, NgZone } from "@angular/core";
import { HttpClientService } from "@service/http-client.service";
import { CategoryModel } from "@model/admin/category.model";
import { AddCategory, DeleteCategory, GetAllCategory, UpdateCategory } from "../action/category.action";
import { NotificationService } from "@service/notification.service";
import { Router } from "@angular/router";
import { LogoutAction } from "../action/logout.action";

export interface CategoryStateModel {
    categoryList: CategoryModel[];
}

@State<CategoryStateModel>({
    name: 'category',
    defaults: {
        categoryList: []
    }
})

@Injectable()
export class CategoryState {

    constructor(private zone: NgZone, private router: Router, private _http: HttpClientService, private _notificationService: NotificationService) {}

    @Action(AddCategory)
    addCategory({ getState, setState }: StateContext<CategoryStateModel>, { payload }: AddCategory) {
        return this._http.addCategory(payload).pipe(tap(response => {
            setState({ ...getState(), categoryList: [ ...getState().categoryList, response.data ] });
            this.zone.run(() => this.router.navigate([response.path]));
            // this._notificationService.notification$.next({ message: response.message, action: 'SUCCESS', panelClass: 'success' });
            alert(`SUCCESS: ${response.message}`);
        }));
    }

    @Selector()
    static getCategoryList(state: CategoryStateModel) {
        return state.categoryList;
    }

    @Action(GetAllCategory)
    getAllCategories({ getState, setState }: StateContext<CategoryStateModel>) {
        if(!getState().categoryList.length) {
            return this._http.getCategory().pipe(tap(response => {
                setState({ ...getState(), categoryList: response.data });
            }));
        }
    }

    @Action(UpdateCategory)
    updateCategory({ getState, patchState }: StateContext<CategoryStateModel>, { id, payload }: UpdateCategory) {
        return this._http.modifyCategory(payload, id).pipe(tap(response => {
            const state = getState();
            const categoryList = [...state.categoryList];
            const index = categoryList.findIndex(category => category.id === id);
            categoryList[index] = { ...payload, id: id };
            patchState({ categoryList: categoryList });
            // this._notificationService.notification$.next({ message: response.message, action: 'SUCCESS', panelClass: 'success' });
            alert(`SUCCESS: ${response.message}`);
            this.zone.run(() => this.router.navigate([response.path]));
        }));
    }

    @Action(DeleteCategory)
    deleteCategory({ getState, setState }: StateContext<CategoryStateModel>, { id }: DeleteCategory) {
        return this._http.deleteCategory(id).pipe(tap(response => {
            const state = getState();
            setState({
                ...state,
                categoryList: state.categoryList.filter(user => user.id !== id)
            });
            // this._notificationService.notification$.next({ message: response.message, action: 'INFO', panelClass: 'info' });
            alert(`INFO: ${response.message}`);
        }));
    }
    
    @Action(LogoutAction)
    resetState({ patchState }: StateContext<CategoryStateModel>) {
        patchState({ categoryList: [] });
    }
}
