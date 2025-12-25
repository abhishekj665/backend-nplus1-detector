import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelizeDB.js";

const OTP = sequelize.define("OTP", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  purpose: {
    type: DataTypes.ENUM(
      "SIGNUP",
      "FORGOT_PASSWORD",
      "RESET_PASSWORD",
      "LOGIN"
    ),
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: () => new Date(Date.now() + 5 * 60 * 1000),
  },
  isUsed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

export default OTP;
