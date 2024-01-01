import { Request, Response, NextFunction } from "express";

export class CustomError extends Error {
  constructor(public code: number, message: string, public status?: string) {
    super(message);
  }
}

export const globalErrorHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  err.statusCode = err.code || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
