import mongoose, { Schema } from "mongoose";
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const ProductSchema = new Schema({
  painterEmail: {
    type: String,
    required: true,
  },
  painterName: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  seq: {
    type: Number,
    default: 0,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
});
ProductSchema.plugin(autoIncrement.plugin, {
  model: "ProductSchemaModel",
  field: "seq",
  startAt: 1,
  increment: 1,
});

export { ProductSchema };
