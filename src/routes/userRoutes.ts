import { getAllUsers } from "@/controllers/userController";
import { Router } from "express";
const userRouter = Router();

userRouter.get("/", getAllUsers);

export default userRouter;
