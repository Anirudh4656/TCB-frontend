import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { Injectable, NgZone } from "@angular/core";
import { HttpClientService } from "@service/http-client.service";
import { SubCategoryModel } from "@model/admin/sub-category.model";
import { AddSubCategory, DeleteSubCategory, GetAllSubCategory, UpdateSubCategory } from "../action/sub-category.action";
import { NotificationService } from "@service/notification.service";
import { Router } from "@angular/router";
import { LogoutAction } from "../action/logout.action";

export interface SubCategoryStateModel {
    subCategoryList: SubCategoryModel[];
}

@State<SubCategoryStateModel>({
    name: 'subCategory',
    defaults: {
        subCategoryList: []
    }
})

@Injectable()
export class SubCategoryState {

    constructor(private zone: NgZone, private router: Router, private _http: HttpClientService, private _notificationService: NotificationService) {}

    @Action(AddSubCategory)
    addSubCategory({ getState, setState }: StateContext<SubCategoryStateModel>, { payload }: AddSubCategory) {
        return this._http.addSubCategory(payload).pipe(tap(response => {
            setState({ ...getState(), subCategoryList: [ ...getState().subCategoryList, response.data ] });
            // this._notificationService.notification$.next({ message: response.message, action: 'SUCCESS', panelClass: 'success' });
            alert(`SUCCESS: ${response.message}`);
            this.zone.run(() => this.router.navigate([response.path]));
        }));
    }

    @Selector()
    static getSubCategoryList(state: SubCategoryStateModel) {
        return state.subCategoryList;
    }

    @Action(GetAllSubCategory)
    getAllSubCategories({ getState, setState }: StateContext<SubCategoryStateModel>) {
        if(!getState().subCategoryList.length) {
            return this._http.getSubCategory().pipe(tap(response => setState({ ...getState(), subCategoryList: response.data })));
        }
    }

    @Action(UpdateSubCategory)
    updateSubCategory({ getState, patchState }: StateContext<SubCategoryStateModel>, { id, payload }: UpdateSubCategory) {
        return this._http.modifySubCategory(payload, id).pipe(tap(response => {
            const state = getState();
            const subCategoryList = [...state.subCategoryList];
            const index = subCategoryList.findIndex(category => category.id === id);
            subCategoryList[index] = { ...payload, id: id };
            patchState({ subCategoryList: subCategoryList });
            // this._notificationService.notification$.next({ message: response.message, action: 'SUCCESS', panelClass: 'success' });
            alert(`SUCCESS: ${response.message}`);
            this.zone.run(() => this.router.navigate([response.path]));
        }));
    }

    @Action(DeleteSubCategory)
    deleteSubCategory({ getState, setState }: StateContext<SubCategoryStateModel>, { id }: DeleteSubCategory) {
        return this._http.deleteSubCategory(id).pipe(tap(response => {
            const state = getState();
            setState({
                ...state,
                subCategoryList: state.subCategoryList.filter(user => user.id !== id)
            });
            // this._notificationService.notification$.next({ message: response.message, action: 'INFO', panelClass: 'info' });
            alert(`INFO: ${response.message}`);
        }));
    }

    @Action(LogoutAction)
    resetState({ patchState }: StateContext<SubCategoryStateModel>) {
        patchState({ subCategoryList: [] });
    }
}
