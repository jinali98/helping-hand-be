import { Request, Response, NextFunction, Router } from "express";
const authRouter = Router();

authRouter.post("/login", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello, World!");
});

export default authRouter;
