import * as educationService from "../../services/education/education.service.js";
import { successResponse, errorResponse } from "../../utils/response.utils.js";

export const getEducation = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const response = await educationService.getEducationService(userId);

    if (!response.success) {
      return errorResponse(res, response.message);
    }

    return successResponse(res, response.data, response.message);
  } catch (error) {
    next(error);
  }
};

export const createEducation = async (req, res, next) => {
  const userId = req.user.id;
  const data = req.body;

  try {
    const response = await educationService.createEducationService(
      userId,
      data
    );

    if (!response.success) {
      return errorResponse(res, response.message);
    }

    return successResponse(res, response.data, response.message);
  } catch (error) {
    next(error);
  }
};

export const updateEducation = async (req, res, next) => {
  const userId = req.user.id;
  const id = req.params.id;
  const data = req.body;

  try {
    const response = await educationService.updateEducationService(
      id,
      userId,
      data
    );

    if (!response.success) {
      return errorResponse(res, response.message);
    }

    return successResponse(res, response.data, response.message);
  } catch (error) {
    next(error);
  }
};

export const deleteEducation = async (req, res, next) => {
  const userId = req.user.id;
  const id = req.params.id;

  try {
    const response = await educationService.deleteEducationService(id, userId);

    if (!response.success) {
      return errorResponse(res, response.message);
    }

    return successResponse(res, response.data, response.message);
  } catch (error) {
    next(error);
  }
};
