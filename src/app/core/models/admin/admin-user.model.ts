export interface AdminUserModel {
    id?: string;
    name: string;
    emailId: string;
    role: string;
    password?: string;
    image?: File;
}