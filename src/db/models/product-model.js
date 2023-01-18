import { model } from "mongoose";
import { ProductSchema } from "../schemas/product-schema";

const Product = model("products", ProductSchema);

export class ProductModel {
    //전체 상품 정보 get
    async findAll() {
        const products = await Product.find()
        return products;
    }
    //상품 추가 post
    async createProduct(productInfo) {
        const createProduct = await Product.create(productInfo);
        return createProduct;
    }
    //상품 업데이트
    async update({seq, update}) {
        return await Product.findOneAndUpdate({seq}, update, { returnOriginal: false});
    }
    //상품 삭제
    async delete(seq) {
        return await Product.findOneAndDelete({seq});
    }
    //상품 정보
    async findById(seq) {
        return await Product.findOne({seq});
    }
    async findByCategoryId(categoryId, page, perPage) {
        const [ total, products ] = await Promise.all([
            Product.countDocuments({categoryId: categoryId}),
            Product.find({ categoryId: categoryId})
            .sort({ createdAt: -1})
            .skip(perPage *(page-1))
            .limit(perPage)
        ])
        const totalPage = Math.ceil(total / perPage);
        return { products, total, totalPage }
    }

        //작가 작품
    async findBypainter(painterEmail) {
        return await Product.find({painterEmail});
    }
    
    
}
const productModel = new ProductModel();

export { productModel };

