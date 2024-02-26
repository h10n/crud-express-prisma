import { lucia } from "@/config/lucia";
import { NextFunction, Request, Response } from "express";
import { verifyRequestOrigin } from "lucia";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.APP_ENV === "production" && req.method !== "GET") {
    const originHeader = req.headers.origin ?? null;
    const hostHeader = req.headers.host ?? null;

    if (
      !originHeader ||
      !hostHeader ||
      !verifyRequestOrigin(originHeader, [hostHeader])
    ) {
      return res
        .status(403)
        .json({
          error: "CSRF Error",
        })
        .end();
    }
  }

  const authorizationHeader = req.get("authorization");

  const cookieToken = lucia.readSessionCookie(req.headers.cookie ?? "");
  const bearerToken = lucia.readBearerToken(authorizationHeader ?? "");
  const sessionId = cookieToken || bearerToken;

  if (!sessionId) {
    res.locals.user = null;
    res.locals.session = null;
    return next();
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
  }

  res.locals.session = session;
  res.locals.user = user;

  return next();
};
