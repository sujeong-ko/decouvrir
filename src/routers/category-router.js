import { Router } from "express";
import is from "@sindresorhus/is";
import { adminOnly } from "../middlewares/adminOnly";
import { categoryService, productService } from '../services';

const categoryRouter = Router();

//카테고리 추가
categoryRouter.post('/', adminOnly ,async (req, res, next) => {
    const newCategory = await categoryService.addCategory(req.body);
    res.status(201).json(newCategory);

})

//조회
categoryRouter.get('/', async (req, res, next) => {
    try {
        const categories = await categoryService.getCategories();

        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
})

//삭제
categoryRouter.delete('/:categoryId', adminOnly ,async (req, res, next)=> {
    try {
        const { categoryId } = req.params;
        const deleteCategory = await categoryService.deleteCategory(categoryId);

        res.status(200).json(deleteCategory);
    } catch (error) {
        next(error);
    }
})

//수정
categoryRouter.patch('/:categoryId', adminOnly ,async (req, res, next) => {
    try {
    const { categoryId } = req.params;
    const { categoryName } = req.body;

    const toUpdate = {
        ...(categoryName && { categoryName}),
    }

    const updateCategory = await categoryService.setCategory(categoryId, toUpdate);
    res.status(200).json(updateCategory);
} catch (error) {
    next(error);
}
})

//카테고리별 product
categoryRouter.get('/products/:categoryId', async (req, res, next) => {
    try{
        const page = Number(req.query.page || 1);
        const perPage = Number(req.query.perPage || 9);

        const { products, total, totalPage } = await productService.getCategoryProducts(req.params.categoryId, page, perPage);

        res.status(200).json({products, total, totalPage});
        
    } catch(error) {
        next(error);
    }
})

export { categoryRouter };