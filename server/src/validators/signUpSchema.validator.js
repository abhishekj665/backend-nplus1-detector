import Joi from "joi";

const signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().min(3).max(20).required(),
  password: Joi.string().min(8).max(20).required(),
});

export default signUpSchema;
