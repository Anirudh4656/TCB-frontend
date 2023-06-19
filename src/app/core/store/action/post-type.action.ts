import { PostTypeModel } from "@model/admin/post-type.model";

// Add Post Type
export class AddPostType {
    static readonly type = '[PostType] Add';
    constructor(public payload: PostTypeModel) {}
}

// Get All Post Type
export class GetAllPostType {
    static readonly type = '[PostType] Get';
}

// Update Post Type
export class UpdatePostType {
    static readonly type = '[PostType] Update';
    constructor(public id: string, public payload: PostTypeModel) {}
}

// Delete Post Type
export class DeletePostType {
    static readonly type = '[PostType] Delete';
    constructor(public id: string) {}
}
