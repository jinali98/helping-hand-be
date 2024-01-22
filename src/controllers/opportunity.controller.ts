import { Request, Response, NextFunction } from "express";
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  STATUS_MESSAGE,
  SUCCESS_MESSAGES,
} from "../enum";
import Opportunity from "../models/opportunity.model";

import { CachingService } from "../services/cache.service";
import { CustomError } from "../services/exception.service";

const cache = new CachingService();

export class OpportunityController {
  async getOpportunityListController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
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
