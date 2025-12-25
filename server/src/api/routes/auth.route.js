import express from "express";
import { signUp, logIn, verifyOtp, logOut } from "../controllers/auth.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import userSchema from "../../validators/userSchema.validator.js";
import { auth } from "../../middlewares/auth.middleware.js";
const Router = express.Router();

Router.route("/signup").post(validate(userSchema), signUp);
Router.route("/login").post(logIn);
Router.route("/verify").get(verifyOtp);
Router.route("/logout").post(auth,logOut);


export default Router;
