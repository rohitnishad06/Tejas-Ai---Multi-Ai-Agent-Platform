import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authMiddleware } from "./middleware/authMiddleware.js";
import { getCurrentuser } from "./controllers/userController.js";
import { proxyWithHeader } from "./utils/proxyWithHeader.js";

dotenv.config();
const port = process.env.PORT;

const app = express();

// middlwwares
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

// routes
app.use("/api/auth", proxy(process.env.AUTH_SERVICE));
app.use("/api/chat", authMiddleware, proxyWithHeader(process.env.CHAT_SERVICE));
app.use("/api/agent", authMiddleware, proxy(process.env.AGENT_SERVICE));
app.get("/api/me", authMiddleware, getCurrentuser);

app.get("/", (req, res) => {
  return res.send("hello from gateway");
});

app.listen(port, () => {
  console.log(`gateway server started at ${port}`);
});
