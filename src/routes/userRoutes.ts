import { getAllUsers } from "@/controllers/userController";
import { Router } from "express";
const usersRouter = Router();

usersRouter.get("/", getAllUsers);

export default usersRouter;
