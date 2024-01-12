import { Request, Response, NextFunction } from "express";
import { CustomError } from "../services/exception.service";
import { ERROR_CODES, ERROR_MESSAGES, STATUS_MESSAGE } from "../enum";

/**
 * this middleware is used to authorize the user based on the user type
 * it takes custom parameter userType which is the user type
 *
 */

export const authroizer = (userType: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new CustomError(
          ERROR_CODES.NOT_AUTHORIZED,
          ERROR_MESSAGES.UNAUTHORIZED,
          STATUS_MESSAGE.UNAUTHORIZED
        );
      }
      if (req.user.userType !== userType) {
        throw new CustomError(
          ERROR_CODES.NOT_AUTHORIZED,
          ERROR_MESSAGES.UNAUTHORIZED,
          STATUS_MESSAGE.UNAUTHORIZED
        );
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
