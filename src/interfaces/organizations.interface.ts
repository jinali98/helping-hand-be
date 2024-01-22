import { Request, Response, NextFunction } from "express";

export interface OrganizationControllerInterface {
  getOrganizationListController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | NextFunction>;
  viewOrganizationController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response<any, Record<string, any>> | NextFunction>;
  updateOrganizationController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | NextFunction>;
}
