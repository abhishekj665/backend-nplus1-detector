import User from "./User.model.js";
import Profile from "./Profile.model.js";
import Education from "./Education.models.js";
import OTP from "./OTP.models.js";
import ActivityLog from "./ActivityLog.model.js";
import OptimizationSuggestion from "./OptimizationSuggestion.model.js";
import DetectIssue from "./DetectIssue.model.js";
import AnalysisJob from "./AnalysisJob.model.js";
import CodeArfitact from "./CodeArtifact.model.js";

User.hasOne(Profile, { foreignKey: "userId" });
Profile.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Education, { foreignKey: "userId" });
Education.belongsTo(User, { foreignKey: "userId" });

User.hasMany(ActivityLog, { foreignKey: "userId" });
ActivityLog.belongsTo(User, { foreignKey: "userId" });

User.hasMany(OTP, { foreignKey: "userId" });
OTP.belongsTo(User, { foreignKey: "userId" });

User.hasMany(AnalysisJob, { foreignKey: "userId" });
AnalysisJob.belongsTo(User, { foreignKey: "userId" });

AnalysisJob.hasMany(CodeArfitact, { foreignKey: "analysisJobId" });
CodeArfitact.belongsTo(AnalysisJob, { foreignKey: "analysisJobId" });

AnalysisJob.hasMany(DetectIssue, { foreignKey: "analysisJobId" });
DetectIssue.belongsTo(AnalysisJob, { foreignKey: "analysisJobId" });

DetectIssue.hasMany(OptimizationSuggestion, {
  foreignKey: "detectedIssueId",
});
OptimizationSuggestion.belongsTo(DetectIssue, {
  foreignKey: "detectedIssueId",
});

export {
  User,
  Profile,
  Education,
  ActivityLog,
  OTP,
  OptimizationSuggestion,
  DetectIssue,
  AnalysisJob,
  CodeArfitact,
};
