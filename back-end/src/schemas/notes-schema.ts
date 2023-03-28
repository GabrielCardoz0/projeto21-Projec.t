import Joi from "joi";

export const noteSchema = Joi.object({
  projectId: Joi.number().required(),
  note: Joi.string().required(),
});

export const noteParamsSchema = Joi.object({
  
});
