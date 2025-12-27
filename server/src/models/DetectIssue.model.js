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

    issueCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    category: {
      type: DataTypes.ENUM("SECURITY", "BUG", "PERFORMANCE"),
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lineNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { timestamps: true }
);

export default DetectIssue;
