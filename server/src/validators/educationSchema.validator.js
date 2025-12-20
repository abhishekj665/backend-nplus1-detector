import Joi from "joi";

const educationSchema = Joi.object({
  degree: Joi.string().required(),
  institution: Joi.string().required(),
  fieldOfStudy: Joi.string().required(),
  grade: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  grade: Joi.string().required(),
});

export default educationSchema;
