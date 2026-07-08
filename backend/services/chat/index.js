import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import chatRouter from "./routes/chatRouter.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

//middleware
app.use(express.json());

//routes
app.use("/",chatRouter)

app.get("/", (req, res) => {
  return res.send("hello from chat");
});

app.listen(port, () => {
  connectDB();
  console.log(`chat server started at ${port}`);
});
