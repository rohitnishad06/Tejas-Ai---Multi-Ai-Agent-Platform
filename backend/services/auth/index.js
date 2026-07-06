import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRouter.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

//middleware
app.use(express.json());

// routes
app.use("/", authRouter);


app.get("/", (req, res) => {
  return res.send("hello from auth");
});

app.listen(port, () => {
  connectDB();
  console.log(`auth server started at ${port}`);
});
