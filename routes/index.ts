import express, { Express, Request, Response } from "express";
import usersRouter from "./userRoutes";
import { getAllUsers } from "../controllers/userController";

const router = express.Router();

router.get("/", getAllUsers);

router.use("/users", usersRouter);

export default router;
