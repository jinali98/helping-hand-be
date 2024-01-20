import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../services/exception.service";
import { ERROR_CODES, ERROR_MESSAGES } from "../enum";

export class VolunteerValidator {
  updateVolunteerProfile(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      address: Joi.string().optional(),
      country: Joi.string().optional(),
      name: Joi.string().optional(),
      bio: Joi.string().optional(),
      profilePic: Joi.string().optional(),
      isPublic: Joi.boolean().optional(),
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
