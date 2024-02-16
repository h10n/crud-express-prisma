import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const authorizeRole = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  // !Todo: implement RBAC
  if (!res.locals.user) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({
        message: 'Forbidden Access',
      })
      .end();
  }
  return next();
};
