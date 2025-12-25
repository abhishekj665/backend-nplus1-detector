import { sequelize } from "../db/sequelizeDB.js";
import { DataTypes } from "sequelize";

const AnalysisJob = sequelize.define(
  "AnalysisJob",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    codeInput: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    codeSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("PENDING", "IN_PROGRESS", "COMPLETED", "FAILED"),
      defaultValue: "PENDING",
      allowNull: false,
    },
    submittedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

export default AnalysisJob;
