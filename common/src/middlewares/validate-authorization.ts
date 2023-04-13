import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";

/**
 * @Middleware
 * Validate if currentUser data is present in the request obj
 * if not present, means the user is not authorized to access
 * some services
 */

export const validateAuthorization = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) throw new NotAuthorizedError();
  next();
};
