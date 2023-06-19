import { SubCategoryModel } from "@model/admin/sub-category.model";

// Add Sub Category
export class AddSubCategory {
    static readonly type = '[SubCategory] Add';
    constructor(public payload: SubCategoryModel) {}
}

// Get All Sub Category
export class GetAllSubCategory {
    static readonly type = '[SubCategory] Get';
}

// Update Sub Category
export class UpdateSubCategory {
    static readonly type = '[SubCategory] Update';
    constructor(public id: string, public payload: SubCategoryModel) {}
}

// Delete Sub Category
export class DeleteSubCategory {
    static readonly type = '[SubCategory] Delete';
    constructor(public id: string) {}
}
