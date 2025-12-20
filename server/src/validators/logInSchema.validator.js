import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(20).required(),
});

export default loginSchema;
