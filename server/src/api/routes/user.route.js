import express from "express";
import {
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const Router = express.Router();

Router.route("/").get(getUsers);
Router.route("/:id").put(updateUser).delete(deleteUser);

export default Router;
