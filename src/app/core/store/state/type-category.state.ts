import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { Injectable, NgZone } from "@angular/core";
import { HttpClientService } from "@service/http-client.service";
import { TypeCategoryModel } from "@model/admin/type-category.model";
import { AddTypeCategory, DeleteTypeCategory, GetAllTypeCategory, UpdateTypeCategory } from "../action/type-category.action";
import { NotificationService } from "@service/notification.service";
import { Router } from "@angular/router";
import { LogoutAction } from "../action/logout.action";

export interface TypeCategoryStateModel {
    typeCategoryList: TypeCategoryModel[];
}

@State<TypeCategoryStateModel>({
    name: 'typeCategory',
    defaults: {
        typeCategoryList: []
    }
})

@Injectable()
export class TypeCategoryState {

    constructor(private zone: NgZone, private router: Router, private _http: HttpClientService, private _notificationService: NotificationService) {}

    @Action(AddTypeCategory)
    addTypeCategory({ getState, setState }: StateContext<TypeCategoryStateModel>, { payload }: AddTypeCategory) {
        return this._http.addTypeCategory(payload).pipe(tap(response => {
            setState({ ...getState(), typeCategoryList: [ ...getState().typeCategoryList, response.data ] });
            // this._notificationService.notification$.next({ message: response.message, action: 'SUCCESS', panelClass: 'success' });
            alert(`SUCCESS: ${response.message}`);
            this.zone.run(() => this.router.navigate([response.path]));
        }));
    }

    @Selector()
    static getTypeCategoryList(state: TypeCategoryStateModel) {
        return state.typeCategoryList;
    }

    @Action(GetAllTypeCategory)
    getAllTypeCategories({ getState, setState }: StateContext<TypeCategoryStateModel>) {
        if(!getState().typeCategoryList.length) {
            return this._http.getTypeCategory().pipe(tap(response => {
                setState({ ...getState(), typeCategoryList: response.data });
            }));
        }
    }

    @Action(UpdateTypeCategory)
    updateTypeCategory({ getState, patchState }: StateContext<TypeCategoryStateModel>, { id, payload }: UpdateTypeCategory) {
        return this._http.modifyTypeCategory(payload, id).pipe(tap(response => {
            const state = getState();
            const typeCategoryList = [...state.typeCategoryList];
            const index = typeCategoryList.findIndex(category => category.id === id);
            typeCategoryList[index] = { ...payload, id: id };
            patchState({ typeCategoryList: typeCategoryList });
            // this._notificationService.notification$.next({ message: response.message, action: 'SUCCESS', panelClass: 'success' });
            alert(`SUCCESS: ${response.message}`);
            this.zone.run(() => this.router.navigate([response.path]));
        }));
    }

    @Action(DeleteTypeCategory)
    deleteTypeCategory({ getState, setState }: StateContext<TypeCategoryStateModel>, { id }: DeleteTypeCategory) {
        return this._http.deleteTypeCategory(id).pipe(tap(response => {
            const state = getState();
            setState({
                ...state,
                typeCategoryList: state.typeCategoryList.filter(user => user.id !== id)
            });
            // this._notificationService.notification$.next({ message: response.message, action: 'INFO', panelClass: 'info' });
            alert(`INFO: ${response.message}`);
        }));
    }

    @Action(LogoutAction)
    resetState({ patchState }: StateContext<TypeCategoryStateModel>) {
        patchState({ typeCategoryList: [] });
    }
}
