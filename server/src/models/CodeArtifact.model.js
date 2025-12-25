import { sequelize } from "../db/sequelizeDB.js";
import { DataTypes } from "sequelize";

const CodeArfitact = sequelize.define(
  "CodeArtifact",
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
    rawCode: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    checkSum: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

export default CodeArfitact;
