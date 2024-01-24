import { Request, Response, NextFunction, Router } from "express";
import { verifyUser } from "../middleware/jwt-verifier.middleware";
import { authroizer } from "../middleware/authorizer.middleware";
import { USER_TYPE } from "../enum";
import { OpportunityController } from "../controllers/opportunity.controller";
const opportunityRouter = Router();
const opportunityController = new OpportunityController();

opportunityRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    // get list of opportunities
    opportunityController.getOpportunityListController(req, res, next);
  }
);

opportunityRouter.post(
  "/",
  verifyUser,
  authroizer([USER_TYPE.ORGANIZATION]),
  async (req: Request, res: Response, next: NextFunction) => {
    // organization creates an opportunity
  }
);

opportunityRouter.get(
  "/:oppId",
  async (req: Request, res: Response, next: NextFunction) => {
    // view a specific opportunity details
    opportunityController.viewOpportunityController(req, res, next);
  }
);

opportunityRouter.patch(
  "/:oppId",
  verifyUser,
  authroizer([USER_TYPE.ORGANIZATION]),
  async (req: Request, res: Response, next: NextFunction) => {
    // update a specific event
  }
);

opportunityRouter.delete(
  "/:oppId",
  verifyUser,
  authroizer([USER_TYPE.ORGANIZATION]),
  async (req: Request, res: Response, next: NextFunction) => {
    // delete a specific event for an organization
  }
);

export default opportunityRouter;
