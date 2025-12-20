import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelizeDB.js";

const IP = sequelize.define(
  "IP",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timezone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isp: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default IP;
