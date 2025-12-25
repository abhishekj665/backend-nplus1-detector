import express from "express";
import {
  createProfile,
  getAllProfiles,
  getProfile,
} from "../controllers/profile.controller.js";
import {auth} from "../../middlewares/auth.middleware.js";


const Router = express.Router();



Router.route("/").get(getAllProfiles).post(auth,createProfile);
Router.route("/:id").get(getProfile);

export default Router;
