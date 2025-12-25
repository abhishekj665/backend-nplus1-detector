import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const auth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    let debugg = jwt.verify(token, env.jwt_password);
    req.user = debugg;
    next();
  } catch (error) {
    next(error);
  }
};
