import express from "express";

import { globalErrorHandler } from "../src/middlewares/globalErrorHandler.middleware.js";
import cookieParser from "cookie-parser";

import userRouter from "./api/routes/user.route.js";
import profileRouter from "./api/routes/profie.route.js";
import authRouter from "./api/routes/auth.route.js";
import { analyzeWithAI } from "./core/ai/llm.core.js";
import jobRouter from "./api/routes/analysisJob.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

//Routes -

app.use("/user", userRouter);
app.use("/profile", profileRouter);
app.use("/auth", authRouter);
app.use("/job", jobRouter);

const code = `
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword
  });

  res.status(201).json({
    success: true,
    data: user
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isValid = bcrypt.compare(password, user.password);

  if (!isValid) {
    res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET
  );

  res.json({ token });
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

export const updatePassword = async (req, res) => {
  const user = await User.findByPk(req.user.id);

  const newHashedPassword = bcrypt.hash(req.body.newPassword, 10);

  user.password = newHashedPassword;
  await user.save();

  res.json({ success: true });
};

export const deleteUser = async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  res.json({ message: "User deleted" });
};
`;

// const result = await analyzeCodeWithAI(code);

// console.log(JSON.stringify(result, null, 2));

app.use(globalErrorHandler);
export default app;
