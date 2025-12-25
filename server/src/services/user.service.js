import { User } from "../models/index.model.js";
import AppError from "../utils/AppError.util.js";
import { generateHash } from "../utils/generateHash.utils.js";
import { nanoid } from "nanoid";
import { getPagination } from "../utils/paginations.utils.js";
import { UniqueConstraintError } from "sequelize";

export const getUsersService = async (page, limit, search) => {
  try {
    let { offset } = getPagination(page, limit);

    let [response] = await User.findAll({ limit, offset });

    return {
      data: response,
      success: true,
      message: "User Fetch Successfully",
    };
  } catch (error) {
    throw new AppError( 500, error.message);
  }
};

// export const createUserService = async (data) => {
//   let { username, email, password } = data;
//   let hash = await generateHash(password);
//   password = hash;
//   try {
//     let response = await User.create({
//       id: nanoid(),
//       username: username,
//       email: email,
//       password: password,
//     });
//     return {
//       success: true,
//       data: response,
//       message: "User Create Successfully",
//     };
//   } catch (error) {
//     if (error instanceof UniqueConstraintError) {
//       const field = error.errors[0]?.path;

//       if (field === "username") {
//         throw new AppError("Username already exists", 409);
//       }

//       if (field === "email") {
//         throw new AppError("Email already exists", 409);
//       }

//       throw new AppError("Duplicate value error", 409);
//     }
//     throw new AppError(error.message, 500);
//   }
// };

export const updateUserService = async (id, data) => {
  try {
    if (!idl) {
      const err = new Error("UserId is required");

      throw new AppError(401, err.message);
    }

    const { username, password, newEmail } = data;

    const updateData = {
      username,
      newEmail,
    };

    if (password) {
      updateData.password = await generateHash(password);
    }

    const [updatedCount] = await User.update(updateData, {
      where: { id },
    });

    let userData = await User.findOne({ where: { id } });

    if (updatedCount === 0) {
      throw new AppError(400, "User not found or no changes made");
    }

    return {
      success: true,
      data: userData,
      message: "User updated successfully",
    };
  } catch (error) {
    return new AppError(400, error.message);
  }
};

export const deleteUserService = async (id) => {
  try {
    if (!id) {
      const err = new Error("UserId is required");
      throw new AppError(401, err.message);
    }

    let userData = await User.findOne({ where: { id } });

    if (!userData) {
      const err = new Error("User not found");
      throw new AppError(404, err.message);
    }

    await User.destroy({ where: { id } });

    return {
      success: true,
      data: userData,
      message: "User deleted successfully",
    };
  } catch (error) {
    return new AppError(400, error.message);
  }
};
