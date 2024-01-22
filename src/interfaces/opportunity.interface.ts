import { Request, Response, NextFunction } from "express";

export interface OpportunityControllerInterface {
  getOpportunityListController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | NextFunction>;
  viewOpportunityController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | NextFunction>;
  createOpportunityController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | NextFunction>;
  updateOpportunityController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | NextFunction>;
  deleteOpportunityController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | NextFunction>;
}
