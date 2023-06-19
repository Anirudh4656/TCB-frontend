import { CategoryModel } from "@model/admin/category.model";

// Add Category
export class AddCategory {
    static readonly type = '[Category] Add';
    constructor(public payload: CategoryModel) {}
}

// Get All Category
export class GetAllCategory {
    static readonly type = '[Category] Get';
}

// Update Category
export class UpdateCategory {
    static readonly type = '[Category] Update';
    constructor(public id: string, public payload: CategoryModel) {}
}

// Delete Category
export class DeleteCategory {
    static readonly type = '[Category] Delete';
    constructor(public id: string) {}
}
