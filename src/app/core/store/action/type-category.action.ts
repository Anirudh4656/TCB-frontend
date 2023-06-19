import { TypeCategoryModel } from "@model/admin/type-category.model";

// Add Type Category
export class AddTypeCategory {
    static readonly type = '[TypeCategory] Add';
    constructor(public payload: TypeCategoryModel) {}
}

// Get All Type Category
export class GetAllTypeCategory {
    static readonly type = '[TypeCategory] Get';
}

// Update Type Category
export class UpdateTypeCategory {
    static readonly type = '[TypeCategory] Update';
    constructor(public id: string, public payload: TypeCategoryModel) {}
}

// Delete Type Category
export class DeleteTypeCategory {
    static readonly type = '[TypeCategory] Delete';
    constructor(public id: string) {}
}
