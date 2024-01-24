import { Request, Response, NextFunction } from "express";
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  STATUS_MESSAGE,
  SUCCESS_MESSAGES,
  STATUS,
} from "../enum";
import Opportunity from "../models/opportunity.model";

import { CachingService } from "../services/cache.service";
import { CustomError } from "../services/exception.service";
import {
  fetchListOfOpportunities,
  viewOpportunity,
} from "../aggregators/opportunity.aggregator";
import { ObjectId } from "mongodb";

const cache = new CachingService();

export class OpportunityController {
  async getOpportunityListController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const opportunities = await fetchListOfOpportunities();

      res.status(200).json({
        status: STATUS_MESSAGE.SUCCESS,
        message: SUCCESS_MESSAGES.RECORDS_FETCHED,
        data: opportunities,
      });
    } catch (err) {
      return next(err);
    }
  }

  async viewOpportunityController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const oppid = req.params?.oppId;
      
      if (!oppid) {
        throw new CustomError(
          ERROR_CODES.BAD_REQUEST,
          ERROR_MESSAGES.INVALID_ENDPOINT,
          STATUS_MESSAGE.FAIL
        );
      }

      const opportunity = await viewOpportunity(oppid);

      if (!opportunity || opportunity.length === 0) {
        throw new CustomError(
          ERROR_CODES.NOT_FOUND,
          ERROR_MESSAGES.NO_RESULTS_FOUND,
          STATUS_MESSAGE.FAIL
        );
      }

      res.status(200).json({
        status: STATUS_MESSAGE.SUCCESS,
        message: SUCCESS_MESSAGES.RECORD_FETCHED,
        data: { ...opportunity[0] },
      });
    } catch (err) {
      return next(err);
    }
  }
  async createOpportunityController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
    } catch (err) {
      return next(err);
    }
  }
  async updateOpportunityController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
    } catch (err) {
      return next(err);
    }
  }
  async deleteOpportunityController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
    } catch (err) {
      return next(err);
    }
  }
}
