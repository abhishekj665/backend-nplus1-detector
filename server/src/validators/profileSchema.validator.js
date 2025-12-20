import Joi from "joi";

const profileSchema = Joi.object({
  name: Joi.string().min(4).max(20).required(),
  surname: Joi.string().min(4).max(20).required(),
  age: Joi.number().min(18).max(100).required(),
  gender: Joi.string().required(),
  city: Joi.string().min(4).max(20).required(),
  country: Joi.string().min(4).max(20).required(),
  profession: Joi.string().min(4).max(20).required(),
});

export default profileSchema;
