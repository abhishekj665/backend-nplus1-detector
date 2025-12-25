import { ActivityLog } from "../models/index.model.js";
import AppError from "../utils/AppError.util.js";
import { nanoid } from "nanoid";

export const createActivityLogsService = async ({
  userId,
  actionType,
  result,
  message,
}) => {
  try {
    const data = await ActivityLog.findOne({
      where: { userId },
    });

    if (!data) {
      const user = await ActivityLog.create({
        userId,
        actionType,
        result,
        message,
      });

      return {
        success: true,
        data: user,
        message: "Activity created successfully",
      };
    }

    const updatedUser = await data.update({
      actionType,
      result,
      message,
    });

    return {
      success: true,
      data: updatedUser,
      message: "Activity updated successfully",
    };
  } catch (error) {
    throw new AppError(400, error.message);
  }
};
