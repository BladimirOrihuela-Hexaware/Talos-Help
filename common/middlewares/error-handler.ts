import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

/**
 * @Middleware
 * Validate if thrown error is a Custom Error instance
 * so, we can respond to client with a consistant shape
 *
 * If thrown error is not a CustomError instance,
 * we just send a default error
 */
export const validateRequestErrors = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(400).send({ errors: [{ message: "Something went wrong" }] });
};
