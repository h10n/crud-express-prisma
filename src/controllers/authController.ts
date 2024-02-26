import { Request, Response } from "express";
import prisma from "@/config/prisma";
import { Argon2id } from "oslo/password";
import { lucia } from "@/config/lucia";

export const login = async (req: Request, res: Response) => {
  try {
    const email: string | null = req.body.email ?? null;
    if (!email || email.length < 3 || email.length > 31) {
      return res.status(400).json({
        email_value: email ?? "",
        error: "Invalid password",
      });
    }
    const password: string | null = req.body.password ?? null;
    if (!password || password.length < 6 || password.length > 255) {
      return res.status(400).json({
        email_value: email,
        error: "Invalid password",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        profile: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
          },
        },
        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!existingUser) {
      return res.status(400).json({
        email_value: email,
        error: "Incorrect email or password",
      });
    }

    const validPassword = await new Argon2id().verify(
      existingUser.password,
      password
    );

    if (!validPassword) {
      return res.status(400).json({
        email_value: email,
        error: "Incorrect email or password",
      });
    }

    const { password: removedPassword, ...user } = existingUser;

    // one session per user
    await lucia.invalidateUserSessions(existingUser.id);

    const session = await lucia.createSession(existingUser.id, {});
    res
      .appendHeader(
        "Set-Cookie",
        lucia.createSessionCookie(session.id).serialize()
      )
      .status(200)
      .json({
        info: "login Success",
        token: session.id,
        user,
      });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
};

export const logout = async (_: Request, res: Response) => {
  if (!res.locals.session) {
    return res
      .status(401)
      .json({
        error: "No Session found",
      })
      .end();
  }

  await lucia.invalidateUserSessions(res.locals.session.userId);

  return res
    .setHeader("Set-Cookie", lucia.createBlankSessionCookie().serialize())
    .status(200)
    .json({
      info: "Logout Success",
    });
};
