import express, { Express, Request, Response, Router } from "express";
import usersRouter from "./userRoutes";

const router = Router();

router.get("/", function (req: Request, res: Response, next) {
  res.send("this is home page");
});

router.use("/users", usersRouter);

export default router;
