import Joi from "joi";

export const sprintSchema = Joi.object({
  projectId: Joi.number().required(),
  number: Joi.number().required(),
});

export const sprintParamsSchema = Joi.object({
  projectId: Joi.number().required(),
});