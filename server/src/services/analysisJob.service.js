import { nanoid } from "nanoid";
import { AnalysisJob } from "../models/index.model.js";
import AppError from "../utils/AppError.util.js";

export const createAnalysisJobService = async (userId, data) => {
  try {

    
    let analysisJob = await AnalysisJob.findOne({ where: { userId } });

    if (!analysisJob) {
      analysisJob = await AnalysisJob.create({
        id: nanoid(),
        userId,
        codeInput: data.codeInput,
        codeSize : data.codeInput.length,
        status: "PENDING",
      });
    } else {
      analysisJob = await analysisJob.update({
        codeInput: data.codeInput,
        codeSize : data.codeInput.length,
        status: "PENDING",
      });
    }

    return {
      id: analysisJob.id,
      status: analysisJob.status,
      result: analysisJob.result,
    };
  } catch (error) {
    throw new AppError(400, error.message);
  }
};

export const getAnalysisJobStatusService = async (id) => {
  try {
    const analysisJob = await AnalysisJob.findOne({ where: { userId: id } });

    if (!analysisJob) {
      throw new AppError(404, "Analysis job not found");
    }

    return {
      id: analysisJob.id,
      status: analysisJob.status,
      result: analysisJob.result,
    };
  } catch (error) {
    throw new AppError(400, error.message);
  }
};
