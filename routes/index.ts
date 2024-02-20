import express, { Express, Request, Response } from "express";
import usersRouter from "./users";

const router = express.Router();

router.get("/", function (req: Request, res: Response, next) {
  res.send("Hello world!");
});

router.use("/users", usersRouter);

export default router;
