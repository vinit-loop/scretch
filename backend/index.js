import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user/UserRoute.js";
import TaskRouter from "./routes/task/TaskRoute.js";
import authRoutes from "./routes/authRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", authRoutes);
app.use("/", userRouter);
app.use("/", TaskRouter);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully!");
  } catch (error) {
    console.log("Unable to connect to MongoDB:", error);
  }
};
connect();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
