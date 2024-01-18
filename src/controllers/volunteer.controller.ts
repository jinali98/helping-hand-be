import { Request, Response, NextFunction } from "express";
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  STATUS_MESSAGE,
  SUCCESS_MESSAGES,
} from "../enum";
import Volunteer from "../models/volunteer.model";

import { CustomError } from "../services/exception.service";

export class VolunteerController {
  async getVolunteerListController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const volunteers = await Volunteer.find(
        {},
        {
          _id: 0,
          __v: 0,
          email: 0,
          address: 0,
        }
      );

      res.status(200).json({
        status: STATUS_MESSAGE.SUCCESS,
        message: SUCCESS_MESSAGES.RECORDS_FETCHED,
        data: volunteers,
      });
    } catch (err) {
      return next(err);
    }
  }

  async viewVolunteerController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const volid = req.params?.volId;

      if (!volid) {
        throw new CustomError(
          ERROR_CODES.BAD_REQUEST,
          ERROR_MESSAGES.INVALID_ENDPOINT,
          STATUS_MESSAGE.FAIL
        );
      }

      const volunteer = await Volunteer.findOne(
        { vol_id: volid },
        {
          _id: 0,
          vol_id: 0,
          __v: 0,
        }
      );

      if (!volunteer) {
        throw new CustomError(
          ERROR_CODES.NOT_FOUND,
          ERROR_MESSAGES.NO_RESULTS_FOUND,
          STATUS_MESSAGE.FAIL
        );
      }

      res.status(200).json({
        status: STATUS_MESSAGE.SUCCESS,
        message: SUCCESS_MESSAGES.RECORD_FETCHED,
        data: volunteer,
      });
    } catch (err) {
      return next(err);
    }
  }

  async updateVolunteerController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const volid = req.user.id;
      await Volunteer.updateOne(
        {
          vol_id: volid,
        },
        {
          address: req.body?.address,
          country: req.body?.country,
          name: req.body?.name,
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
