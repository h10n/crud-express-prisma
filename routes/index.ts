import express, { Express, Request, Response } from "express";

const router = express.Router();

/* GET home page. */
router.get("/", function (req: Request, res: Response, next) {
  res.send("this is home page");
});

export default router;
