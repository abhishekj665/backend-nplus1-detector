import express from "express";
import {
  createProfile,
  getAllProfiles,
  getProfile,
} from "../controllers/profile.controller.js";
import { auth } from "../../middlewares/auth.middleware.js";

const Router = express.Router();

Router.route("/").get(auth, getAllProfiles).post(auth, createProfile);
Router.route("/:id").get(auth, getProfile);

export default Router;
