import Joi from "joi";


export const educationSchema = Joi.object({
  degree: Joi.string().required(),
  institution: Joi.string().required(),
  fieldOfStudy: Joi.string().required(),
  grade: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  grade: Joi.string().required(),
});


export  const signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().min(3).max(20).required(),
  password: Joi.string().min(8).max(20).required(),
});

export const userSchema = Joi.object({
  username: Joi.string().min(4).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(20).required(),
});

export const profileSchema = Joi.object({
  name: Joi.string().min(4).max(20).required(),
  surname: Joi.string().min(4).max(20).required(),
  age: Joi.number().min(18).max(100).required(),
  gender: Joi.string().required(),
  city: Joi.string().min(4).max(20).required(),
  country: Joi.string().min(4).max(20).required(),
  profession: Joi.string().min(4).max(20).required(),
});


const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(20).required(),
});

