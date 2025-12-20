import Joi from "joi";

const userSchema = Joi.object({
  username: Joi.string().min(4).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(20).required(),
});

export default userSchema;
