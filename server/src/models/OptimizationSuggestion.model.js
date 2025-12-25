import { sequelize } from "../db/sequelizeDB.js";
import { DataTypes } from "sequelize";

const OptimizationSuggestion = sequelize.define("OptimizationSuggestion", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true, 
    },
    suggestionText : {
        type : DataTypes.STRING,
        allowNull : false
    },
    detectedIssueId : {
      type: DataTypes.UUID,
      allowNull: false,
    },
    optimizationType : {
        type : DataTypes.ENUM("QUERY_BATCHING,CACHING","ASYNC_FACTOR"),
        allowNull : false
    },
    confidenceScore : {
        type : DataTypes.FLOAT,
        allowNull : true
    }
                
  },
  { timestamps: true }
)

export default OptimizationSuggestion;