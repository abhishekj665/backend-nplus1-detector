import { sequelize } from "../db/sequelizeDB.js";
import { DataTypes } from "sequelize";

const DetectIssue = sequelize.define(
  "DetectIssue",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    analysisJobId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    issueType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    issueDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    locationHint: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    detectedIssue: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

export default DetectIssue;
