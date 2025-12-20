import jwt from "jsonwebtoken";
import { env } from "../config/env";

export default auth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    let debugg = jwt.verify(token, env.jwt_password);
    req.user = debugg;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
