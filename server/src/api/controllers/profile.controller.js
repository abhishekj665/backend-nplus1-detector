import * as profileService from "../../services/profile.service.js";

import { errorResponse, successResponse } from "../../utils/response.utils.js";

export const getProfile = async (req, res, next) => {
  let id = req.query.id;

  try {
    let response = await profileService.getProfileService(id);
    if (response.success) {
      return successResponse(res, response.data, response.message);
    } else {
      return errorResponse(res, response.message);
    }
  } catch (error) {
    next(error);
  }
};

export const getAllProfiles = async (req, res, next) => {
  try {
    let response = await profileService.getAllProfilesService();
    if (response.success) {
      return successResponse(res, response.data, response.message);
    } else {
      return errorResponse(res, response.message);
    }
  } catch (error) {
    next(error);
  }
};

export const createProfile = async (req, res, next) => {
  let data = req.body;
  let userId = req.user.id;
  try {
    let response = await profileService.createProfileService(userId, data);
    if (response.success) {
      return successResponse(res, response.data, response.message);
    } else {
      return errorResponse(res, response.message);
    }
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  let data = req.body;
  let userId = req.user.id;
  try {
    let response = await profileService.updateProfileService(userId, data);
    if (response.success) {
      return successResponse(res, response.data, response.message);
    } else {
      return errorResponse(res, response.message);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteProfile = async (req, res, next) => {
  let userId = req.user.id;
  try {
    let response = await profileService.deleteProfileService(userId);
    if (response.success) {
      return successResponse(res, response.data, response.message);
    } else {
      return errorResponse(res, response.message);
    }
  } catch (error) {
    next(error);
  }
};
