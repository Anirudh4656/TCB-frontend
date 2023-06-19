import { ManipulatePostModel } from "@model/public/posts/manipulate -post.model";

export class AddPost {
    static readonly type = '[Posts] Add';
    constructor(public payload: ManipulatePostModel) {}
}

export class GetAllPosts {
    static readonly type = '[Posts] Get All';
}

export class GetPost {
    static readonly type = '[Posts] Get';
    constructor(public id: string) {}
}

export class UpdatePost {
    static readonly type = '[Posts] Update';
    constructor( public id: string,public payload: ManipulatePostModel) {}
}

export class DeletePost {
    static readonly type = '[Posts] Delete';
    constructor(public id: string) {}
}
