import { Router } from "express";
import is from "@sindresorhus/is";
import { loginRequired, painterOnly, myProduct } from "../middlewares";
import { productService } from "../services";
import { imageUpload } from "./image-router";

const productRouter = Router();

//상품 등록
productRouter.post(
  "/product",
  loginRequired,
  painterOnly,
  async (req, res, next) => {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error("create product error");
      }
      // console.log(req.file.location)
      // req.body.image = req.file.location;
      // console.log(req.body.image)
      const {
        painterEmail,
        painterName,
        productName,
        price,
        content,
        category,
        image,
        categoryId,
      } = req.body;
      const newProductInfo = {
        painterEmail,
        painterName,
        productName,
        price,
        content,
        category,
        image,
        categoryId,
      };
      const newProduct = await productService.addProduct(newProductInfo);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    } //safd
  }
);

//전체 상품 목록 가져오기
productRouter.get("/products", async (req, res) => {
  const products = await productService.getproducts();

  res.status(200).json(products);
});

//작가의 상품 가져오기
productRouter.get("/products/:painter", async (req, res) => {
  const painterEmail = req.query.painterEmail;
  const products = await productService.getproductsPainter(painterEmail);
  res.status(200).json(products);
});

//상품 정보 수정
productRouter.patch(
  "/:seq",
  loginRequired,
  painterOnly,
  myProduct,
  async (req, res, next) => {
    try {
      const { seq } = req.params;
      const { productName, price, content, category, image, categoryId } =
        req.body;

      const toUpdate = {
        ...(productName && { productName }),
        ...(price && { price }),
        ...(content && { content }),
        ...(category && { category }),
        ...(image && { image }),
        ...(categoryId && { categoryId }),
      };

      const updateProduct = await productService.setProduct(seq, toUpdate);
      res.status(201).send(updateProduct);
    } catch (error) {
      next(error);
    }
  }
);

//상품 삭제
productRouter.delete(
  "/:seq",
  loginRequired,
  painterOnly,
  myProduct,
  async (req, res, next) => {
    const { seq } = req.params;
    const deleteProduct = await productService.deleteProduct(seq);

    res.status(201).send(deleteProduct);
  }
);

export { productRouter };
