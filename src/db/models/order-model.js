import { model } from "mongoose";
import { OrderSchema } from "../schemas/order-schema";

const Order = model("orders", OrderSchema);

export class OrderModel {
    async create(orderInfo) {
        const createdOrder = await Order.create(orderInfo);
        return createdOrder;
      } 

      async update(userEmail, orderDate, orderNumber, update){
        return await Order.findOneAndUpdate({email: userEmail, orderId: orderDate, orderNumber}, update)
      }

      async find(orderDate, orderNumber) {
        const order = await Order.findOne({ orderId: orderDate, orderNumber });
        return order;
     }

     async findAll(userId) {
      const orders = await Order.find({ email: userId });
      return orders;
   }

   async findAllAdmin() {
    const order = await Order.find({});
    return order;
 }

    async delete(orderId){
      return await Order.findOneAndDelete({ orderId }); 
    }


}

const orderModel = new OrderModel();

export { orderModel };