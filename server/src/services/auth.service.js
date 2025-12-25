import { OTP, User } from "../models/index.model.js";
import { generateOtp } from "../utils/generateOtp.utils.js";
import bcrypt from "bcrypt";
import AppError from "../utils/AppError.util.js";
import { nanoid } from "nanoid";
import jwtSign from "../utils/jwtSign.utils.js";
import { createOTP } from "../utils/createOTP.utils.js";
import { findOtpData } from "../utils/findOtpData.utils.js";
import STATUS from "../config/constants/Status.js";
import { localTime } from "../utils/localTime.utils.js";

export const signUpService = async ({ username, email, password }) => {
  if (!email || !password) {
    throw new AppError(400, "Email and password required");
  }

  const exists = await User.findOne({ where: { email } });
  if (exists) {
    throw new AppError(409, "User already exists");
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

  awaitcreateOTP(user.id, email, otp, "SIGNUP");

  return {
    success: true,
    message: "You have to Verify your account first. OTP sent to email",
  };
};

export const logInService = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (!user.dataValues.isVerified) {
    const otp = generateOtp();

    await createOTP(user.dataValues.id, email, otp, "LOGIN");
    return {
      success: true,
      message: "You have to Verify your account first. OTP sent to email",
    };
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new AppError(401, "Invalid credentials");
  }

  const token = jwtSign(user.id);

  user.login_At = new Date();

  console.log("USER LogIN at : ", localTime(user.login_At));
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
  console.log(email, otp, purpose);
  const otpData = await findOtpData(email, purpose);

  if (!otpData) {
    throw new AppError(400, "OTP not found");
  }

  if (otpData.expiresAt < new Date()) {
    throw new AppError(400, "OTP expired");
  }

  const valid = await bcrypt.compare(otp, otpData.otp);
  if (!valid) {
    throw new AppError(400, "Invalid OTP");
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
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      throw new AppError(404, "User not found");
    }
  } catch (error) {
    throw new AppError(400, error.message);
  }
};
