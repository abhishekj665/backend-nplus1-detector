import express from "express";
import { createAnalysisJob } from "../controllers/analysisJob.controller.js";
import { auth } from "../../middlewares/auth.middleware.js";

const Router = express.Router();

Router.route("/").post(auth, createAnalysisJob);

export default Router;
