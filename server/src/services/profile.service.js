import AppError from "../utils/AppError.util.js";
import { Profile } from "../models/index.model.js";
import { nanoid } from "nanoid";

export const getProfileService = async (userId) => {
  try {
    let userData = await Profile.findOne({ where: { userId } });

    if (!userData) {
      return {
        success: false,
        message: "User not found",
      };
    }

    return {
      success: true,
      data: userData,
      message: "User fetched successfully",
    };
  } catch (error) {
    return new AppError(400, error.message);
  }
};

export const getAllProfilesService = async () => {
  try {
    let userData = await Profile.findAll();

    if (!userData) {
      return {
        success: false,
        message: "No User Found",
      };
    }

    return {
      success: true,
      data: userData,
      message: "User fetched successfully",
    };
  } catch (error) {
    return new AppError(400, error.message);
  }
};

export const createProfileService = async (userId, data) => {
  try {
    let { name, surname, city, country, age, gender, profession } = data;

    let userData = await Profile.create({
      id: nanoid(),
      name,
      surname,
      city,
      country,
      age,
      gender,
      profession,
      userId,
    });

    if (!userData) {
      return {
        success: false,
        message: "User not created",
      };
    }

    return {
      success: true,
      data: userData,
      message: "User created successfully",
    };
  } catch (error) {
    return new AppError(400, error.message);
  }
};

export const updateProfileService = async (userId, data) => {
  try {
    let profileData = await Profile.findOne({ where: { userId } });

    if (!profileData) {
      return {
        success: false,
        message: "Profile not found",
      };
    }

    let user = await Profile.update(data, { where: { userId } });

    if (!userData) {
      return {
        success: false,
        message: "Profile not updated",
      };
    }

    return {
      success: true,
      data: user,
      message: "Profile updated successfully",
    };
  } catch (error) {
    return new AppError(400, error.message);
  }
};

export const deleteProfileService = async (userId) => {
  try {
    let userData = await Profile.findOne({ where: { userId } });

    if (!userData) {
      return {
        success: false,
        message: "Profile not found",
      };
    }

    await Profile.destroy({ where: { userId } });

    return {
      success: true,
      data: userData,
      message: "Profile deleted successfully",
    };
  } catch (error) {
    return new AppError(400, error.message);
  }
};
