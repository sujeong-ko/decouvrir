import mongoose, { Schema } from "mongoose";
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const OrderSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    products: {
      type: Object,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    recipientName: {
      type: String,
      required: true,
    },
    recipientPhoneNumber: {
      type: String,
      required: true,
    },
    recipientAddress: {
      type: String,
      required: true,
    },
    deliveryStatus: {
      type: String,
      required: true,
    },
    orderedAt: {
      type: Date,
      immutable: true,
      default: () => Date.now(),
    },
    orderNumber: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: "orders",
  }
);
OrderSchema.plugin(autoIncrement.plugin, {
  model: "OrderModel",
  field: "orderNumber",
  startAt: 0,
  increment: 1,
});
export { OrderSchema };
