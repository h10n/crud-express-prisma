import express, { Express, Request, Response, Router } from "express";
import userRouter from "./userRoutes";
import { authRouter } from "./authRoutes";
import { authRoleMiddleware } from "@/middlewares/authRoleMiddleware";

const router = Router();

router.get("/", function (req: Request, res: Response, next) {
  res.send("this is home page");
});

router.use("/users", authRoleMiddleware, userRouter);
router.use("/auth", authRouter);

export default router;
