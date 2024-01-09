import { Request, Response, NextFunction, Router } from "express";

const opportunityRouter = Router();

opportunityRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    // get all events for an organization
  }
);
opportunityRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    // create an event for an organization
  }
);

opportunityRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    // get a specific event for an organization
  }
);

opportunityRouter.patch(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    // update a specific event for an organization
  }
);

opportunityRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    // delete a specific event for an organization
  }
);

export default opportunityRouter;
