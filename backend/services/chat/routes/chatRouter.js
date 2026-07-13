import express from "express";
import {
  createConversation,
  getConversation,
  getMessage,
  saveMessage,
  updateConversation,
} from "../controllers/chatController.js";

const chatRouter = express.Router();

chatRouter.get("/get-conversations", getConversation);
chatRouter.get("/create-conversation", createConversation);
chatRouter.get("/get-messages/:conversationId", getMessage);
chatRouter.post("/update-conversation", updateConversation);
chatRouter.post("/save-message", saveMessage);


export default chatRouter;
