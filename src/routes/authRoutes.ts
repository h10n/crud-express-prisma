import express from "express";
import { Argon2id } from "oslo/password";
import { lucia } from "@/config/lucia.js";
import prisma from "@/config/prisma.js";

export const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  const email: string | null = req.body.email ?? null;
  if (
    !email ||
    email.length < 3 ||
    email.length > 31 ||
    !/^[a-z0-9_-]+$/.test(email)
  ) {
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

  //! Todo: check if user id must be string
  const session = await lucia.createSession(`${existingUser.id}`, {});
  res
    .appendHeader(
      "Set-Cookie",
      lucia.createSessionCookie(session.id).serialize()
    )
    .appendHeader("Location", "/")
    .redirect("/");
});
