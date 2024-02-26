import { NextFunction, Request, Response } from "express";

export const authRoleMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // !Todo: implement RBAC
  if (!res.locals.user) {
    return res
      .status(403)
      .json({
        error: "Forbidden Access",
      })
      .end();
  }
  next();
};
