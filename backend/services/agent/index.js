import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

//middleware
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("hello from agent");
});

app.listen(port, () => {
  connectDB();
  console.log(`agent server started at ${port}`);
});
