import { lucia } from "@/config/lucia";
import { NextFunction, Request, Response } from "express";
import { verifyRequestOrigin } from "lucia";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // if (req.method === "GET") {
  //   return next();
  // }
  const originHeader = req.headers.origin ?? null;
  const hostHeader = req.headers.host ?? null;

  // if (
  //   !originHeader ||
  //   !hostHeader ||
  //   !verifyRequestOrigin(originHeader, [hostHeader])
  // ) {
  //   return res
  //     .status(403)
  //     .json({
  //       error: "Forbidden",
  //     })
  //     .end();
  // }
  const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");
  if (!sessionId) {
    res.locals.user = null;
    res.locals.session = null;
    return res
      .status(403)
      .json({
        error: "No Session",
      })
      .end();
  }

  const { session, user } = await lucia.validateSession(sessionId);
  if (session && session.fresh) {
    res.appendHeader(
      "Set-Cookie",
      lucia.createSessionCookie(session.id).serialize()
    );
  }
  if (!session) {
    res.appendHeader(
      "Set-Cookie",
      lucia.createBlankSessionCookie().serialize()
    );

    return res
      .status(403)
      .json({
        error: "Invalid Session",
      })
      .end();
  }

  res.locals.session = session;
  res.locals.user = user;

  return next();
};
