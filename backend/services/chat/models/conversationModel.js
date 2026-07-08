import mongoose from "mongoose";

const conversationSchema = mongoose.Schema(
  {
    title: {
      type: String,
      default: "New Chat",
    },
    userId: {
      type: String,
    },
  },
  { timestamps: true },
);

const conversationModel = mongoose.model("Conversation", conversationSchema);

export default conversationModel;
