import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../services/exception.service";
import { ERROR_CODES, ERROR_MESSAGES } from "../enum";

export class AuthValidator {
  volunterRegistration(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      address: Joi.string().required(),
      country: Joi.string().required(),
      name: Joi.string().required(),
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
  organizationRegistration(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      address: Joi.string().required(),
      country: Joi.string().required(),
      phone: Joi.string().required(),
      organizationName: Joi.string().required(),
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
  confirmSignUp(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      code: Joi.string().required(),
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
  login(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
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
  resendConfirmationCode(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
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
