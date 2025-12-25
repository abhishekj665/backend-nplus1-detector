import { nanoid } from "nanoid";
import { AnalysisJob } from "../models/index.model.js";
import AppError from "../utils/AppError.util.js";

export const createAnalysisJobService = async (userId, data) => {
  try {
    const analysisJob = await AnalysisJob.create({
      id: nanoid(),
      userId,
      codeInput: data.codeInput,
      codeSize: data.codeInput.length,
      status: "PENDING",
    });

    return analysisJob;
  } catch (error) {
    throw new AppError(400, error.message);
  }
};
