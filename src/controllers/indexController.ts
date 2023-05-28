import { Request, Response, Router } from "express";
import asyncHandler from "express-async-handler";

export const indexController = Router();

indexController.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    res.status(200).send("This is the Donkeyboard api");
  })
);

indexController.post(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    res.status(200).send("This is the Donkeyboard api");
  })
);
