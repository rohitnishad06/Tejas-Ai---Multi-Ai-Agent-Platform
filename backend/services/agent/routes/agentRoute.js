import express from "express"
import { agent } from "../controllers/agentController.js"
const agentRoute = express.Router()

agentRoute.post("/chat", agent)

export default agentRoute