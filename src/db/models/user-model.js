import { model } from "mongoose";
import { UserSchema } from "../schemas/user-schema";

const User = model("users", UserSchema);

export class UserModel {
  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  async findOneUser(userId) {
    const user = await User.findOne({ email: userId });
    return user;
  }

  async create(userInfo) {
    const createdNewUser = await User.create(userInfo);
    return createdNewUser;
  }

  async findAll() {
    const users = await User.find({});
    return users;
  }

  async findPainters() {
    const painters = await User.find({ role: "painter-user" });
    return painters;
  }

  async update({ userNumber, userId, update }) {
    const filter = { userNumber, email: userId };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }

  async delete(userNumber) {
    return await User.findOneAndDelete({ userNumber });
  }
}

const userModel = new UserModel();

export { userModel };
