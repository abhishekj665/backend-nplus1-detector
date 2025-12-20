import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelizeDB.js";

const Education = sequelize.define("Education", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  degree: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  institution: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fieldOfStudy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  grade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

export default Education;
