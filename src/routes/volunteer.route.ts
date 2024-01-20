import { Request, Response, Router, NextFunction } from "express";
import { verifyUser } from "../middleware/jwt-verifier.middleware";
import { authroizer } from "../middleware/authorizer.middleware";
import { USER_TYPE } from "../enum";
import { VolunteerController } from "../controllers/volunteer.controller";

import { VolunteerValidator } from "../middleware/volunteer-validator.middleware";

const volunteerRouter = Router();
const volunteerController = new VolunteerController();
const volunteerValidator = new VolunteerValidator();

volunteerRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    volunteerController.getVolunteerListController(req, res, next);
  }
);

volunteerRouter.patch(
  "/",
  verifyUser,
  authroizer([USER_TYPE.VOLUNTEER]),
  volunteerValidator.updateVolunteerProfile,
  async (req: Request, res: Response, next: NextFunction) => {
    volunteerController.updateVolunteerController(req, res, next);
  }
);

volunteerRouter.get(
  "/:volId",
  async (req: Request, res: Response, next: NextFunction) => {
    volunteerController.viewVolunteerController(req, res, next);
  }
);

export default volunteerRouter;
