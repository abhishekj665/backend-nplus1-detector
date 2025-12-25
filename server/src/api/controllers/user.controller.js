import { errorResponse, successResponse } from "../../utils/response.utils.js";
import * as authService from "../../services/user.service.js";

export const getUsers = async (req, res, next) => {
  let page = req.query.page || 1;
  let limit = req.query.limit || 10;
  let search = req.query.search || null;

  page = parseInt(page);
  limit = parseInt(limit);

  try {
    let response = await authService.getUsersService(page, limit, search);
    if (response.success) {
      return successResponse(res, response.data, response.message);
    } else {
      return errorResponse(res, response.message);
    }
  } catch (error) {
    next(error);
  }
};

// export const createUser = async (req, res, next) => {
//   try {
//     let response = await authService.createUserService(req.body);
//     if (response.success) {
//       return successResponse(res, response.data, response.message);
//     } else {
//       return errorResponse(res, response.message);
//     }
//   } catch (error) {
//     next(error);
//   }
// };

export const updateUser = async (req, res, next) => {
  let { id } = req.query;

  let data = req.body;

  try {
    let response = await authService.updateUserService(id, data);
    if (response.success) {
      return successResponse(res, response.data, response.message);
    } else {
      return errorResponse(res, response.message);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  let id = req.params.id;

  try {
    let response = await authService.deleteUserService(id);
    if (response.success) {
      return successResponse(res, response.data, response.message);
    } else {
      return errorResponse(res, response.message);
    }
  } catch (error) {
    next(error);
  }
};
