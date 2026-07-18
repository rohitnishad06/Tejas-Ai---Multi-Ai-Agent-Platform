import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  name:String,
  content:String
},{
  _id:false
})

const artifactsSchema = new mongoose.Schema({
  id:Number,
  type:String,
  title:String,
  files:[fileSchema]
},{
  _id:false
})

const messageSchema = mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },
    role: {
      type: String,
      enum: ["user", "assistant"],
    },
    content: String,
    images: [String],
    artifacts:[artifactsSchema]
  },
  { timestamps: true },
);

const messageModel = mongoose.model("Message", messageSchema);

export default messageModel;
