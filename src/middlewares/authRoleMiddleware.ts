import { lucia } from "@/config/lucia";
import { NextFunction, Request, Response } from "express";

export const authRoleMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
