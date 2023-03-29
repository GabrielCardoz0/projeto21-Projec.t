import Joi from "joi";

export const sprintSchema = Joi.object({
  projectId: Joi.number().required(),
  number: Joi.string().required(),
});
