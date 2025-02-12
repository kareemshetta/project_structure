import Joi from "joi";

const createSchema = Joi.object({
  name: Joi.string().trim().max(255).required().messages({
    "string.base": " name must be a string.",
    "string.empty": " name cannot be empty.",
    "string.max": " name cannot exceed 255 characters.",
    "any.required": " name is required and cannot be null.",
  }),
  nameAr: Joi.string().trim().max(255).required().messages({
    "string.base": " nameAr must be a string.",
    "string.empty": " nameAr cannot be empty.",
    "string.max": " nameAr cannot exceed 255 characters.",
    "any.required": " nameAr is required and cannot be null.",
  }),
});

const updateSchema = Joi.object({
  name: Joi.string().trim().max(255).required().messages({
    "string.base": " name must be a string.",
    "string.empty": " name cannot be empty.",
    "string.max": " name cannot exceed 255 characters.",
    "any.required": " name is required and cannot be null.",
  }),
  nameAr: Joi.string().trim().max(255).required().messages({
    "string.base": " nameAr must be a string.",
    "string.empty": " nameAr cannot be empty.",
    "string.max": " nameAr cannot exceed 255 characters.",
    "any.required": " nameAr is required and cannot be null.",
  }),
});

export { createSchema, updateSchema };
