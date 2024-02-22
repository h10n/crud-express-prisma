import express, { Express, Request, Response } from "express";
const router = express.Router();

/* GET users listing. */
router.get("/", function (req: Request, res: Response, next) {
  res.send("this is users page");
});

export default router;
