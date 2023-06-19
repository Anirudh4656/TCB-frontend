import { CategoryModel } from "@model/admin/category.model";
import { PostTypeModel } from "@model/admin/post-type.model";
import { SubCategoryModel } from "@model/admin/sub-category.model";
import { TypeCategoryModel } from "@model/admin/type-category.model";

export interface GetPostsModel {
    id?: string;
    title: string;
    description: string;
    image: string;
    blog_content: string;
    youtube_video_link: string;
    tags: string;
    author: string;
    likes: number;
    views: number;
    post_type: PostTypeModel | null;
    category: CategoryModel;
    sub_category: SubCategoryModel;
    type_category: TypeCategoryModel;
    createdAt: string;
}
