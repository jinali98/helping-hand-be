import { Request, Response, NextFunction } from "express";

export interface AuthServiceInterface {
  userRegistration(
    email: string,
    password: string
  ): Promise<{ userid: string } | Error>;
  confirmSignUp(email: string, code: string): Promise<any | Error>;
  login(
    email: string,
    password: string
  ): Promise<
    | {
        accessToken: string;
        refreshToken: string;
        idToken: string;
      }
    | Error
  >;
}
export interface AuthControllerInterface {
  volunteerRegistration(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | NextFunction>;
  organizationRegstration(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | NextFunction>;
  confirmSignup(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | NextFunction>;

  login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | NextFunction>;
}
