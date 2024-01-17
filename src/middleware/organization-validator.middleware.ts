import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../services/exception.service";
import { ERROR_CODES, ERROR_MESSAGES } from "../enum";

export class OrganizationValidator {
  updateOrganizationProfile(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      address: Joi.string().optional(),
      country: Joi.string().optional(),
      name: Joi.string().optional(),
      phone: Joi.string().optional(),
      website: Joi.string().optional(),
      description: Joi.string().optional(),
      category: Joi.string().optional(),
      logo: Joi.string().optional(),
      facebook: Joi.string().optional(),
      instagram: Joi.string().optional(),
      twitter: Joi.string().optional(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return next(
        new CustomError(
          ERROR_CODES.BAD_REQUEST,
          error.details[0].message,
          ERROR_MESSAGES.VALIDATION_ERROR
        )
      );
    }
    next();
  }
}
