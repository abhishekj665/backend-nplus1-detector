import { sequelize } from "../db/sequelizeDB.js";
import { DataTypes } from "sequelize";

const ActivityLog = sequelize.define(
  "ActivityLog",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },
    actionType: {
      type: DataTypes.ENUM(
        "LOGIN",
        "LOGOUT",
        "CODE_UPLOAD",
        "CODE_ANALYSIS",
        "AI_CALL",
        "DETECTOR_RUN"
      ),
      allowNull: false,
    },
    result: {
      type: DataTypes.ENUM("SUCCESS", "FAIL", "BLOCKED"),
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    indexes: [{ fields: ["userId"] }, { fields: ["actionType"] }],
  }
);

export default ActivityLog;
