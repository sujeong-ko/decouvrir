import { model } from "mongoose";
import { CategorySchema } from "../schemas/category-schema";

const Category = model("categories", CategorySchema);

export class CategoryModel {
    async findByCategory(categoryName) {
        return await Category.findOne({categoryName});
    }
    //카테고리 생성
    async create(CategoryInfo) {
        const createCategory = await Category.create(CategoryInfo);
        return createCategory;
    }
    //수정
    async update({categoryId, update}) {
        return await Category.findOneAndUpdate({categoryId}, update, { returnOriginal: false});
    }
    //전체 조회
    async findAll() {
        const categories = await Category.find({});
        return categories;
    }
    //특정 카테고리 조회
    async findById(categoryId) {
        const category = await Category.findOne({categoryId});
        return category;
    }
    //삭제
    async delelte(categoryId) {
        return await Category.findOneAndDelete({categoryId});
    }
}

const categoryModel = new CategoryModel();
export { categoryModel };