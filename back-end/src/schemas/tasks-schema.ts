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