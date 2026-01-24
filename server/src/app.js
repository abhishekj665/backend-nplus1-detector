import express from "express";
import { globalErrorHandler } from "../src/middlewares/globalErrorHandler.middleware.js";
import cookieParser from "cookie-parser";
import userRouter from "./api/routes/user.route.js";
import profileRouter from "./api/routes/profie.route.js";
import authRouter from "./api/routes/auth.route.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

app.use(express.json());
app.use(cookieParser());

//Routes -

app.use("/user", userRouter);
app.use("/profile", profileRouter);
app.use("/auth", authRouter);

app.use(globalErrorHandler);
export default app;
