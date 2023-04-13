import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  name: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

/**
 * @Middleware
 * Will insert currentUser data in the request object
 * currentUser is undefined when jwt is corrupted or cookie is not included in the request header
 */

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.jwt) next();

  try {
    const payload = jwt.verify(req.session!.jwt, process.env.JWT_KEY!) as UserPayload;
    req.currentUser = payload;
  } catch (error) {}

  next();
};
