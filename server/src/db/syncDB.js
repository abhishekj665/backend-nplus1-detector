import {sequelize} from "./sequelizeDB.js";
import { User, Profile, Education, IP, OTP } from "../models/index.model.js";

export const syncDB = async () => {
  console.log("DB sync started");

  try {
    await sequelize.sync({ alter: true });
    console.log("Tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error.message);
  }

  console.log("DB sync finished");
};
