import { categoryModel } from "../db";

class CategoryService {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    async getCategories() {
        return await this.categoryModel.findAll();
    }
    async addCategory(CategoryInfo) {
        const { categoryName } = CategoryInfo;
        //중복확인
        const category = await this.categoryModel.findByCategory(categoryName);
        if (category) {
            throw new Error('이미 생성된 카테고리입니다.');
        }
        return await this.categoryModel.create(CategoryInfo);
    }
    async setCategory(categoryId, toUpdate) {
        let category = await this.categoryModel.findById(categoryId);
        if (!category) {
            throw new Error ('없는 카테고리입니다.');
        }

        let categoryName = await this.categoryModel.findByCategory(toUpdate.category);
        if(categoryName) {
            throw new Error ('이미 있는 카테고리입니다.');
        }
        return await this.categoryModel.update({
            categoryId,
            update: toUpdate,
        })
    }
    async getCategoryByName(CategoryInfo) {
        const category = await this.categoryModel.findByCategory(CategoryInfo);
    
        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!category) {
        throw new Error(
            "없는 카테고리입니다."
        );
        }
    
        return category;
    }
    
    async deleteCategory(categoryId) {
        const category = await categoryModel.delelte(categoryId);
        if(!category){
            throw new Error('해당 카테고리가 없습니다.');
        }
        return category;
    } 
}

const categoryService = new CategoryService(categoryModel);

export { categoryService };
