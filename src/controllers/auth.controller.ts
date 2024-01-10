import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { AuthControllerInterface } from "../interfaces/auth.interface";
import Organization from "../models/organization.model";
import Volunteer from "../models/volunteer.model";
import { STATUS_MESSAGE, SUCCESS_MESSAGES } from "../enum";

const authentication = new AuthService();

export class AuthController implements AuthControllerInterface {
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const { accessToken, refreshToken, idToken } = await authentication.login(
        email.trim(),
        password.trim()
      );

      res.status(200).json({
        status: STATUS_MESSAGE.SUCCESS,
        message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
        data: {
          accessToken,
          refreshToken,
          idToken,
        },
      });
    } catch (err) {
      return next(err);
    }
  };
  volunteerRegistration = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password, address, country, name } = req.body;

      const { userid } = await authentication.userRegistration(
        email.trim(),
        password.trim()
      );

      const volunteer = new Volunteer({
        vol_id: userid,
        email: email.trim(),
        address,
        country,
        name: name,
      });

      await volunteer.save();

      res.status(200).json({
        status: STATUS_MESSAGE.SUCCESS,
        message: SUCCESS_MESSAGES.SENT_OTP,
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

      const organization = new Organization({
        org_id: userid,
        email: email.trim(),
        address,
        country,
        phone,
        name: organizationName,
      });

      await organization.save();

      res.status(200).json({
        status: STATUS_MESSAGE.SUCCESS,
        message: SUCCESS_MESSAGES.SENT_OTP,
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
        status: STATUS_MESSAGE.SUCCESS,
        message: SUCCESS_MESSAGES.OTP_VERIFIED,
        data: {},
      });
    } catch (err) {
      return next(err);
    }
  };
  resendConfirmationCode = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email } = req.body;

      await authentication.resendConfirmationCode(email.trim());

      res.status(200).json({
        status: STATUS_MESSAGE.SUCCESS,
        message: SUCCESS_MESSAGES.RESEND_OTP,
        data: {},
      });
    } catch (err) {
      return next(err);
    }
  };
}
