import { Router } from "express";
import { authController } from "./controllers/authController";
import { userController } from "./controllers/userController";

export const router = Router();

router.use("/auth", authController);
router.use("/user", userController);
