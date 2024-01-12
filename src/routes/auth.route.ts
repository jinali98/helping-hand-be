import { Request, Response, NextFunction, Router } from "express";

import { AuthController } from "../controllers/auth.controller";
import { AuthValidator } from "../middleware/auth-validator.middleware";
import { verifyUser } from "../middleware/jwt-verifier.middleware";
import { authroizer } from "../middleware/authorizer.middleware";

const authRouter = Router();
const authController = new AuthController();
const authValidator = new AuthValidator();

authRouter.post(
  "/login",
  authValidator.login,
  async (req: Request, res: Response, next: NextFunction) => {
    authController.login(req, res, next);
  }
);

authRouter.post(
  "/volunteer",
  authValidator.volunterRegistration,
  async (req: Request, res: Response, next: NextFunction) => {
    authController.volunteerRegistration(req, res, next);
  }
);

authRouter.post(
  "/organization",
  authValidator.organizationRegistration,
  async (req: Request, res: Response, next: NextFunction) => {
    authController.organizationRegstration(req, res, next);
  }
);

authRouter.post(
  "/confirm-registration",
  authValidator.confirmSignUp,
  async (req: Request, res: Response, next: NextFunction) => {
    authController.confirmSignup(req, res, next);
  }
);
authRouter.post(
  "/resend-confirmation-code",
  authValidator.resendConfirmationCode,
  async (req: Request, res: Response, next: NextFunction) => {
    authController.resendConfirmationCode(req, res, next);
  }
);

authRouter.post(
  "/refresh-token",
  verifyUser,
  authroizer("organization"),
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    res.status(200).json({
      status: "success",
      message: "Token Refreshed",
      data: req.user,
    });
  }
);

export default authRouter;
