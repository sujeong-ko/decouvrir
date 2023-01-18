import mongoose, { Schema } from "mongoose";
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);
//
const UserSchema = new Schema(
  {
    userNumber: {
      type: Number,
      default: 0,
    },
    email: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: false,
      // default: "basic-user",
    },
    // painter: {
    //   type: new Schema(
    //     {
    //       painterName: String,
    //       introduce: String,
    //     }
    //   )
    // },
    painterName: {
      type: String,
      required: false,
    },
    introduce: {
      type: String,
      required: false,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

UserSchema.plugin(autoIncrement.plugin, {
  model: "UserModel",
  field: "userNumber",
  startAt: 0,
  increment: 1,
});

export { UserSchema };
