import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      unique: true,
    },
    name: String,
    email: String,
    avatar: String,
  },
  {
    timestapms: true,
  },
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
