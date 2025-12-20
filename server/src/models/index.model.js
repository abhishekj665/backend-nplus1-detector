import User from "./User.model.js";
import Profile from "./Profile.model.js";
import Education from "./Education.models.js";
import IP from "./IP.models.js";
import OTP from "./OTP.models.js";

User.hasOne(Profile, { foreignKey: "userId" });
Profile.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Education, { foreignKey: "userId" });
Education.belongsTo(User, { foreignKey: "userId" });

User.hasMany(IP, { foreignKey: "userId" });
IP.belongsTo(User, { foreignKey: "userId" });

User.hasMany(OTP, { foreignKey: "userId" });
OTP.belongsTo(User, { foreignKey: "userId" });

export { User, Profile, Education, IP, OTP };
