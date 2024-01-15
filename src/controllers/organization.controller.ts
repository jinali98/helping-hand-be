import { Request, Response, NextFunction } from "express";
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  STATUS_MESSAGE,
  SUCCESS_MESSAGES,
} from "../enum";
import Organization from "../models/organization.model";

import { CustomError } from "../services/exception.service";

export class OrganizationController {
  async getOrganizationListController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const organizations = await Organization.find(
        {},
        {
          _id: 0,
          __v: 0,
          email: 0,
          address: 0,
          phone: 0,
        }
      );

      res.status(200).json({
        status: STATUS_MESSAGE.SUCCESS,
        message: SUCCESS_MESSAGES.RECORDS_FETCHED,
        data: organizations,
      });
    } catch (err) {
      return next(err);
    }
  }

  async viewOrganizationController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const orgid = req.params?.orgId;

      if (!orgid) {
        throw new CustomError(
          ERROR_CODES.BAD_REQUEST,
          ERROR_MESSAGES.INVALID_ENDPOINT,
          STATUS_MESSAGE.FAIL
        );
      }

      const organization = await Organization.findOne(
        { org_id: orgid },
        {
          _id: 0,
          org_id: 0,
          __v: 0,
        }
      );

      if (!organization) {
        throw new CustomError(
          ERROR_CODES.NOT_FOUND,
          ERROR_MESSAGES.NO_RESULTS_FOUND,
          STATUS_MESSAGE.FAIL
        );
      }

      res.status(200).json({
        status: STATUS_MESSAGE.SUCCESS,
        message: SUCCESS_MESSAGES.RECORD_FETCHED,
        data: organization,
      });
    } catch (err) {
      return next(err);
    }
  }

  async updateOrganizationController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {}
}
