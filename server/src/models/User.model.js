import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelizeDB.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  }
);

export default User;
