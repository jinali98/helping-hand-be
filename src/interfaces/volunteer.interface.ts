import { Request, Response, NextFunction } from "express";

export interface VolunteerControllerInterface {
  getVolunteerListController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | NextFunction>;
  viewVolunteerController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | NextFunction>;
  updateVolunteerController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | NextFunction>;
}
