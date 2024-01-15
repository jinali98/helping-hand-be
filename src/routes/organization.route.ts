import { Request, Response, Router, NextFunction } from "express";
import { verifyUser } from "../middleware/jwt-verifier.middleware";
import { authroizer } from "../middleware/authorizer.middleware";
import { USER_TYPE } from "../enum";
import { OrganizationController } from "../controllers/organization.controller";
const organizationRouter = Router();
const organizationController = new OrganizationController();

organizationRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    organizationController.getOrganizationListController(req, res, next);
  }
);

organizationRouter.get(
  "/:orgId",
  async (req: Request, res: Response, next: NextFunction) => {
    organizationController.viewOrganizationController(req, res, next);
  }
);

organizationRouter.patch(
  "/",
  verifyUser,
  authroizer([USER_TYPE.ORGANIZATION]),
  async (req: Request, res: Response, next: NextFunction) => {}
);

export default organizationRouter;
