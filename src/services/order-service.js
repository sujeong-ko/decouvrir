import { orderModel } from "../db";

class OrderService {
  // 본 파일의 맨 아래에서, new OrderService(orderModel) 하면, 이 함수의 인자로 전달됨
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  async addOrder(orderInfo) {
    const {
      userEmail,
      products,
      recipientName,
      recipientPhoneNumber,
      recipientAddress,
    } = orderInfo;
    // 날짜로 주문번호 생성
    const newDate = new Date();
    function formatDate(newDate) {
      let formattedDate = `${newDate.getFullYear()}`;
      formattedDate += `${`0${newDate.getMonth() + 1}`.slice(-2)}`;
      formattedDate += `${`0${newDate.getDate()}`.slice(-2)}`;
      return formattedDate;
    }
    const orderId = formatDate(newDate);
    //   const totalPrice = products.reduce((acc, curr)=>{
    //     return acc.price + curr.price;
    // });
    const totalPrice = 12000;
    const deliveryStatus = "상품준비중";
    const email = userEmail; // user 스키마에 userId 필드 auto-increment로 수정하기
    const newOrderInfo = {
      email,
      orderId,
      products,
      totalPrice,
      recipientName,
      recipientPhoneNumber,
      recipientAddress,
      deliveryStatus,
    };
    const order = orderModel.create(newOrderInfo);
    return order;
  }

  async setOrder(orderDate, orderNumber, orderInfo) {
    const { userId, recipientName, recipientPhoneNumber, recipientAddress } =
      orderInfo;
    const update = { recipientName, recipientPhoneNumber, recipientAddress };
    return orderModel.update(userId, orderDate, orderNumber, update);
  }

  async getOneOrder(orderDate, orderNumber) {
    return await orderModel.find(orderDate, orderNumber);
  }
  // orderService.getAllOrders(req.body.userId);
  async getAllOrders(userId) {
    return await orderModel.findAll(userId);
  } // userId에 맞는 주문 다 가져오기

  async deleteOrder(orderId) {
    return await orderModel.delete(orderId);
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
