import { AdminUserModel } from "@model/admin/admin-user.model";

// Registration
export class AddAdminUser {
    static readonly type = '[AdminUser] Post';
    constructor(public payload: AdminUserModel) {}
}

// Get All Admin Users
export class GetAllAdminUsers {
    static readonly type = '[AdminUser] Get';
}

// Update Admin User
export class UpdateAdminUser {
    static readonly type = '[AdminUser] Update';
    constructor(public id: string, public payload: AdminUserModel) {}
}

// Delete Admin User
export class DeleteAdminUser {
    static readonly type = '[AdminUser] Delete';
    constructor(public id: string) {}
}