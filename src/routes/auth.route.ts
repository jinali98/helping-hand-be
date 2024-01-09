import { Request, Response, NextFunction, Router } from "express";

import { AuthController } from "../controllers/auth.controller";
import { AuthValidator } from "../middleware/auth-validator.middleware";

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
  "/confirmRegistration",
  authValidator.confirmSignUp,
  async (req: Request, res: Response, next: NextFunction) => {
    authController.confirmSignup(req, res, next);
  }
);
authRouter.post(
  "/resendConfirmationCode",
  authValidator.resendConfirmationCode,
  async (req: Request, res: Response, next: NextFunction) => {
    authController.resendConfirmationCode(req, res, next);
  }
);

authRouter.post(
  "/refreshToken",
  async (req: Request, res: Response, next: NextFunction) => {}
);

export default authRouter;
