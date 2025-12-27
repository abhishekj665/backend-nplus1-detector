import * as analysisJobService from "../../services/analysisJob.service.js";
import { successResponse, errorResponse } from "../../utils/response.utils.js";
import STATUS from "../../config/constants/Status.js";
import AppError from "../../utils/AppError.util.js";
import * as activityLogsService from "../../services/activityLogs.service.js";
import { processAnalysisJob } from "../../core/analysis.core.js";

export const createAnalysisJob = async (req, res, next) => {
  try {
    const analysisJob = await analysisJobService.createAnalysisJobService(
      req.user.id,
      req.body
    );

    console.log(analysisJob.id);

    await activityLogsService.createActivityLogsService({
      userId: req.user.id,
      actionType: "CODE_UPLOAD",
      result: "SUCCESS",
      message: "Code uploaded successfully",
    });

    const response = await processAnalysisJob(analysisJob.id);

    return successResponse(
      res,
      response,
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

export const getAnalysisJobStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    const analysisJob = await analysisJobService.getAnalysisJobStatusService(
      id
    );

    if (!analysisJob) {
      throw new AppError(404, "Analysis job not found");
    }

    return successResponse(
      res,
      analysisJob,
      "Analysis job status retrieved successfully",
      STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};
