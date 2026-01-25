import { OTP, User } from "../models/Associations.model.js";
import { generateOtp } from "../config/otpService.js";
import bcrypt from "bcrypt";
import AppError from "../utils/AppError.util.js";
import { nanoid } from "nanoid";
import jwtSign from "../utils/jwt.utils.js";
import { createOTP } from "../config/otpService.js";
import { findOtpData } from "../config/otpService.js";

export const signUpService = async ({ username, email, password }) => {
  if (!email || !password) {
    return {
      success: false,
      message: "Email and password are required",
    };
  }

  const exists = await User.findOne({ where: { email } });
  if (exists) {
    return {
      success: false,
      message: "User already exists",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let user = await User.create({
    id: nanoid(),
    username,
    email,
    password: hashedPassword,
    isVerified: false,
  });

  const otp = generateOtp();

  await createOTP(user.id, email, otp, "SIGNUP");

  return {
    success: true,
    message: "You have to Verify your account first. OTP sent to email",
    data: user,
  };
};

export const logInService = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return {
      success: false,
      message: "User Not Found",
    };
  }

  if (!user.isVerified) {
    const otp = generateOtp();

    await createOTP(user.id, email, otp, "LOGIN");

    return {
      success: false,
      message: "You have to Verify your account first. OTP sent to email",
      data: user.isVerified,
    };
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return {
      success: false,
      message: "Invalid Password",
    };
  }

  const token = jwtSign(user.id);

  user.login_At = new Date();

  await user.save();

  await OTP.destroy({ where: { email: user.email } });

  return {
    success: true,
    id: user.id,
    token,
    message: "Login successful",
  };
};

export const verifyOtpService = async (email, otp, purpose) => {
  const otpData = await findOtpData(email, purpose);

  if (!otpData) {
    return {
      success: false,
      message: "OTP not found",
    };
  }

  if (otpData.expiresAt < new Date()) {
    return {
      success: false,
      message: "OTP expired",
    };
  }

  const valid = await bcrypt.compare(otp, otpData.otp);
  if (!valid) {
    return {
      success: false,
      message: "Invalid OTP",
    };
  }

  otpData.isUsed = true;
  await otpData.save();

  let user = await User.findOne({
    where: {
      email,
    },
  });

  user.isVerified = true;
  await user.save();

  if (purpose === "SIGNUP") {
    await User.update({ isVerified: true }, { where: { email } });
    return { success: true, message: "Account verified successfully" };
  }

  if (purpose === "LOGIN") {
    return { success: true, message: "Login OTP verified" };
  }
};

export const logOutService = async (userId) => {
  try {
    const user = await User.findOne({ where: { id: userId }, raw: true });

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }
  } catch (error) {
    throw new AppError(400, error.message);
  }
};
