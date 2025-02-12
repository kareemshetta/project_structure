import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { ValidationError } from "../utils/appError";

interface ValidationOptions {
  source?: "body" | "query" | "params";
  stripUnknown?: boolean;
  abortEarly?: boolean;
}

const defaultOptions: ValidationOptions = {
  source: "body",
  stripUnknown: false,
  abortEarly: true,
};

export const validateSchema = (
  schema: ObjectSchema,
  options: ValidationOptions = defaultOptions
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const source = options.source || "body";
    const dataToValidate = req[source];

    const { error, value } = schema.validate(dataToValidate, {
      stripUnknown: options.stripUnknown,
      abortEarly: options.abortEarly,
    });

    if (error) {
      throw new ValidationError(error.message);
    }
    return next();
  };
};
