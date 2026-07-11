import express from "express"
import { agent } from "../controllers/chatController.js"
const agentRoute = express.Router()

agentRoute.post("/chat", agent)

export default agentRoute