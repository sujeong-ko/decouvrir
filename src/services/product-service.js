import { productModel } from "../db";

class ProductService {
  constructor(productModel) {
    this.productModel = productModel;
  }

  //상품 추가
  async addProduct(productInfo) {
    return productModel.createProduct(productInfo);
  }
  // 상품 목록을 받음.
  async getproducts() { 
    return await this.productModel.findAll();
  }
  //특정 상품 받음
  async getproduct(seq) {
    return await this.productModel.findById(seq);
  }
  // 상품정보 수정
  async setProduct(seq, toUpdate) {
    // 우선 해당 product가 db에 있는지 확인
    let product = await this.productModel.findById(seq);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!product) {
      throw new Error("등록된 상품이 아닙니다.");
    }

    // 상품 업데이트
    return this.productModel.update({
      seq,
      update: toUpdate,
    });
  }
  
  //상품 삭제
  async deleteProduct(seq) {
    let product = await productModel.delete(seq);
    return product;
  }
  //카테고리별 상품
  async getCategoryProducts(categoryId, page, perPage) {
    return await this.productModel.findByCategoryId(categoryId, page, perPage);
  }
  //painter의 상품 가져옴
  async getproductsPainter(painterEmail) {
    return await this.productModel.findBypainter(painterEmail);
  }
}

const productService = new ProductService(productModel);

export { productService };
