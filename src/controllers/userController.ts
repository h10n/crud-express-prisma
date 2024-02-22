import { Request, Response } from "express";
import { getUsers } from "@/services/userService";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.status(200).send(users);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
};
