import { Request, Response, NextFunction } from "express";
import { CustomError } from "../services/exception.service";
import { ERROR_CODES, ERROR_MESSAGES } from "../enum";
import { CognitoJwtVerifier } from "aws-jwt-verify";

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const verifier = CognitoJwtVerifier.create({
      userPoolId: process.env.COGNITO_USER_POOL_ID,
      clientId: process.env.COGNITO_CLIENT_ID,
      tokenUse: "id", 
    });

    const header = req.headers.authorization.replace("Bearer ", "");

    const payload = await verifier.verify(header);
    
/**
 * added the jwt payload to the req.user object
 * so that it can be used in the controller to authorize the user
 */
    req.user = {
      email: payload.email as string,
      userType: payload["custom:userType"] as string,
      id: payload.sub,
    };
    next();
  } catch (err) {
    return next(
      new CustomError(
        ERROR_CODES.NOT_AUTHORIZED,
        err.message,
        ERROR_MESSAGES.UNAUTHORIZED
      )
    );
  }
};
