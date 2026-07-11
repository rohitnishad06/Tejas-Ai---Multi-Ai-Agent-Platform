import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";
import agentRoute from "./routes/agentRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

//middleware
app.use(express.json());

app.use("/", agentRoute)



app.listen(port, () => {
  connectDB();
  console.log(`agent server started at ${port}`);
});
