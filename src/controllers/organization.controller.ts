import { Request, Response, NextFunction } from "express";
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  STATUS_MESSAGE,
  SUCCESS_MESSAGES,
} from "../enum";
import Organization from "../models/organization.model";

import { CachingService } from "../services/cache.service";
import { CustomError } from "../services/exception.service";
import { OrganizationControllerInterface } from "../interfaces/organizations.interface";

const cache = new CachingService();

export class OrganizationController implements OrganizationControllerInterface {
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
      const results = await cache.getCachedData(req.originalUrl);

      if (results) {
        return res.status(200).json({
          status: STATUS_MESSAGE.SUCCESS,
          message: SUCCESS_MESSAGES.RECORD_FETCHED,
          data: results,
        });
      }

      const organization = await Organization.findOne(
        { orgId: orgid },
        {
          _id: 0,
          orgId: 0,
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

      await cache.setCache(req.originalUrl, organization);

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
  ) {
    try {
      const orgid = req.user.id;
      await Organization.updateOne(
        {
          orgId: orgid,
        },
        {
          address: req.body?.address,
          country: req.body?.country,
          name: req.body?.name,
          phone: req.body?.phone,
          website: req.body?.website,
          description: req.body?.description,
          category: req.body?.category,
          logo: req.body?.logo,
          facebook: req.body?.facebook,
          instagram: req.body?.instagram,
          twitter: req.body?.twitter,
        }
      );
      res.status(200).json({
        status: STATUS_MESSAGE.SUCCESS,
        message: SUCCESS_MESSAGES.RECORD_UPDATED,
      });
    } catch (err) {
      return next(err);
    }
  }
}
