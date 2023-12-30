import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../services/exception.service";

export class AuthValidator {
  volunterRegistration(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      address: Joi.string().required(),
      country: Joi.string().required(),
      phone: Joi.string().required(),
      name: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return next(new CustomError(400, error.details[0].message));
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
      return next(new CustomError(400, error.details[0].message));
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
      return next(new CustomError(400, error.details[0].message));
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
      return next(new CustomError(400, error.details[0].message));
    }
    next();
  }
}
