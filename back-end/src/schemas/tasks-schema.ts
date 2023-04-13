import Joi from "joi";

export const taskSchema = Joi.object({
  sprintId: Joi.number().required(),
  responsible: Joi.string().required(),
  task: Joi.string().required(),
  description: Joi.string(),
  status: Joi.string(),
  endsAt: Joi.date(),
  createdAt: Joi.date(),
});

export const taskParamsSchema = Joi.object({
  sprintId: Joi.number().required(),
});

export const taskUpdateSchema = Joi.object({
  id: Joi.number().required(),
  sprintId: Joi.number().required(),
  status: Joi.string().required(),
});