import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import User from "../models/user.model";
import { AuthControllerInterface } from "../interfaces/auth.interface";

const authentication = new AuthService();

export class AuthController implements AuthControllerInterface {
  login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const response = await authentication.login(email.trim(), password.trim());

    try {
      res.status(200).json({
        status: "success",
        data: response,
      });
    } catch (err) {
      next(err);
    }
  };
  volunteerRegistration = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password, address, country, phone, name } = req.body;

      const { userid } = await authentication.userRegistration(
        email.trim(),
        password.trim()
      );

      const volunteer = new User({
        userId: userid,
        email: email.trim(),
        address,
        country,
        phone,
        volName: name,
      });

      await volunteer.save();

      res.status(200).json({
        status: "success",
        data: {},
      });
    } catch (err) {
      return next(err);
    }
  };
  organizationRegstration = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password, address, country, phone, organizationName } =
        req.body;

      const { userid } = await authentication.userRegistration(
        email.trim(),
        password.trim()
      );

      const organization = new User({
        userId: userid,
        email: email.trim(),
        address,
        country,
        phone,
        userType: "org",
        orgName: organizationName,
      });

      await organization.save();

      res.status(200).json({
        status: "success",
        data: {},
      });
    } catch (err) {
      return next(err);
    }
  };
  confirmSignup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, code } = req.body;

      await authentication.confirmSignUp(email.trim(), code);

      res.status(200).json({
        status: "success",
        data: {},
      });
    } catch (err) {
      next(err);
    }
  };
}
