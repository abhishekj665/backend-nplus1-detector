import * as analysisJobService from "../../services/analysisJob.service.js";
import { successResponse, errorResponse } from "../../utils/response.utils.js";
import STATUS from "../../config/constants/Status.js";
import AppError from "../../utils/AppError.util.js";
import * as activityLogsService from "../../services/activityLogs.service.js";

export const createAnalysisJob = async (req, res, next) => {
  try {
    const analysisJob = await analysisJobService.createAnalysisJobService(
      req.user.id,
      req.body
    );

    await activityLogsService.createActivityLogsService({
      userId: req.user.id,
      actionType: "CODE_UPLOAD",
      result: "SUCCESS",
      message: "Code uploaded successfully",
    });

    return successResponse(
      res,
      analysisJob,
      "Analysis job created successfully",
      STATUS.ACCEPTED
    );
  } catch (error) {
    await activityLogsService.createActivityLogsService({
      userId: req.user.id,
      actionType: "CODE_UPLOAD",
      result: "FAIL",
      message: error.message,
    });

    next(error);
  }
};
