import { Router } from "express";
import is from "@sindresorhus/is";
import { loginRequired } from "../middlewares";
import { orderService } from "../services";

const orderRouter = Router();

// 주문 생성
orderRouter.post("/order", loginRequired, async (req, res, next) => {
  try {
    req.body.userEmail = req.currentUserId;
    const {
      userEmail,
      products,
      recipientName,
      recipientPhoneNumber,
      recipientAddress,
    } = req.body;

    const orderInfo = {
      userEmail,
      products,
      recipientName,
      recipientPhoneNumber,
      recipientAddress,
    };
    const newOrder = await orderService.addOrder(orderInfo);
    res.status(201).json(newOrder);
  } catch (err) {
    next(err);
  }
});

//주문 수정
orderRouter.patch(
  "/orders/:fullOrderId",
  loginRequired,
  async (req, res, next) => {
    try {
      req.body.userEmail = req.currentUserId;
      const fullOrderId = req.params.fullOrderId;
      const orderDate = fullOrderId.slice(0, 8);
      const orderNumber = fullOrderId.slice(8);
      const {
        userEmail,
        recipientName,
        recipientPhoneNumber,
        recipientAddress,
      } = req.body;
      const newOrderInfo = {
        userEmail,
        recipientName,
        recipientPhoneNumber,
        recipientAddress,
      };
      await orderService.setOrder(orderDate, orderNumber, newOrderInfo);
      // 해당 user인지 userId도 확인해야함
      res.json({
        message: "주문 정보 수정 성공",
      });
    } catch (err) {
      next(err);
    }
  }
);

orderRouter.get("/orders", async (req, res, next) => {
  try {
    req.body.userId = req.currentUserId;
    const orders = await orderService.getAllOrders(req.body.userId);
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

orderRouter.get(
  "/orders/:fullOrderId",
  loginRequired,
  async (req, res, next) => {
    try {
      req.body.userId = req.currentUserId;
      const fullOrderId = req.params.fullOrderId;
      const orderDate = fullOrderId.slice(0, 8);
      const orderNumber = fullOrderId.slice(8);
      // console.log(orderDate, orderNumber);
      const order = await orderService.getOneOrder(orderDate, orderNumber);
      res.json(order);
      return;
    } catch (err) {
      next(err);
    }
  }
);

orderRouter.delete("/orders/:orderId", async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    await orderService.deleteOrder(orderId);
    res.json({
      message: "주문 정보 삭제 완료",
    });
  } catch (err) {
    next(err);
  }
});

export { orderRouter };
