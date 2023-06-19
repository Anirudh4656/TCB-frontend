import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { AdminUserModel } from "@model/admin/admin-user.model";
import { Injectable, NgZone } from "@angular/core";
import { HttpClientService } from "@service/http-client.service";
import { DeleteAdminUser, GetAllAdminUsers, UpdateAdminUser } from "../action/admin-user.action";
import { NotificationService } from "@service/notification.service";
import { Router } from "@angular/router";
import { LogoutAction } from "../action/logout.action";
import { AddAdminUser } from "../action/admin-user.action";

export interface AdminUserStateModel {
    adminUserList: AdminUserModel[];
}

@State<AdminUserStateModel>({
    name: 'adminUser',
    defaults: {
        adminUserList: []
    }
})

@Injectable()
export class AdminUserState {

    constructor(private zone: NgZone, private router: Router, private _http: HttpClientService, private _notificationService: NotificationService) { }

    @Selector()
    static getAdminUsersList(state: AdminUserStateModel) {
        return state.adminUserList;
    }

    @Action(GetAllAdminUsers)
    getAllAdminUsers({ getState, setState }: StateContext<AdminUserStateModel>) {
        if (!getState().adminUserList.length) {
            return this._http.getAllAdmin().pipe(tap(response => {
                setState({ ...getState(), adminUserList: response.data });
            }));
        }
    }

    @Action(AddAdminUser)
    addAdminUser({ getState, setState }: StateContext<AdminUserStateModel>, { payload }: AddAdminUser) {
        return this._http.adminRegistration(payload).pipe(tap(response => {
            setState({ ...getState(), adminUserList: [ ...getState().adminUserList, response.data ] });
            this.zone.run(() => this.router.navigate([response.path]));
            // this._notificationService.notification$.next({ message: response.message, action: 'SUCCESS', panelClass: 'success' });
            alert(`SUCCESS: ${response.message}`);
        }));
    }

    @Action(UpdateAdminUser)
    updateAdminUser({ getState, patchState }: StateContext<AdminUserStateModel>, { id, payload }: UpdateAdminUser) {
        return this._http.modifyAdmin(payload, id).pipe(tap(response => {
            const state = getState();
            const adminUserList = [...state.adminUserList];
            const index = adminUserList.findIndex(user => user.id === id);
            adminUserList[index] = { ...payload, id: id };
            patchState({ adminUserList: adminUserList });
            // this._notificationService.notification$.next({ message: response.message, action: 'SUCCESS', panelClass: 'success' });
            alert(`SUCCESS: ${response.message}`);
            this.zone.run(() => this.router.navigate([response.path]));
        }));
    }

    @Action(DeleteAdminUser)
    deleteAdminUser({ getState, setState }: StateContext<AdminUserStateModel>, { id }: DeleteAdminUser) {
        return this._http.deleteAdmin(id).pipe(tap(response => {
            const state = getState();
            setState({ ...state, adminUserList: state.adminUserList.filter(user => user.id !== id) });
            // this._notificationService.notification$.next({ message: response.message, action: 'INFO', panelClass: 'info' });
            alert(`INFO: ${response.message}`);
        }));
    }

    @Action(LogoutAction)
    resetState({ patchState }: StateContext<AdminUserStateModel>) {
        patchState({ adminUserList: [] });
    }
}
