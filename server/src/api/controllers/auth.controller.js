import * as authServices from "../../services/auth.service.js";
import { successResponse, errorResponse } from "../../utils/response.utils.js";
import { setCookie } from "../../utils/setCookie.utils.js";
import STATUS from "../../config/constants/Status.js";
import AppError from "../../utils/AppError.util.js";
import * as activityLogsService from "../../services/activityLogs.service.js";
import { clearCookie } from "../../utils/clearCookie.utils.js";

export const signUp = async (req, res, next) => {
  try {
    const result = await authServices.signUpService(req.body);
    if (result.success) {
      return successResponse(res, result, result.message, STATUS.ACCEPTED);
    } else {
      return errorResponse(res, result.message, STATUS.NOT_ACCEPTABLE);
    }
  } catch (error) {
    next(error);
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    let { email, otp, purpose } = req.query;
    console.log(email, otp, purpose);
    if (purpose != undefined || otp != undefined || email != undefined) {
      purpose = purpose.toUpperCase();
    } else {
      throw new AppError(403, "Email or Purpose or OTP is required");
    }

    const result = await authServices.verifyOtpService(email, otp, purpose);
    return successResponse(res, result, result.message, STATUS.ACCEPTED);
  } catch (error) {
    next(error);
  }
};

export const logIn = async (req, res, next) => {
  try {
    const result = await authServices.logInService(req.body);

    if (!result.success) {
      return errorResponse(res, result.message, STATUS.UNAUTHORIZED);
    }

    setCookie(res, "token", result.token);

    await activityLogsService.createActivityLogsService({
      userId: result.id,
      actionType: "LOGIN",
      result: "SUCCESS",
      message: result.message,
    });

    return successResponse(res, result, result.message, STATUS.OK);
  } catch (error) {
    next(error);
  }
};

export const logOut = async (req, res, next) => {
  try {
    let response = clearCookie(res, "token");

    response = await activityLogsService.createActivityLogsService({
      userId: req.user.id,
      actionType: "LOGOUT",
      result: "SUCCESS",
      message: "User Successfully LogOut",
    });

    if (response.success) {
      return successResponse(
        res,
        response,
        "User Successfully LogOut",
        STATUS.OK
      );
    } else {
      return errorResponse(res, "Something went wrong", STATUS.UNAUTHORIZED);
    }
  } catch (error) {
    next(error);
  }
};
