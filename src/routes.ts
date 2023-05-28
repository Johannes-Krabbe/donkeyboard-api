import { Router } from "express";
import { authController } from "@controllers/auth/authController";
import { userController } from "@controllers/userController";
import { indexController } from "@controllers/indexController";

export const router = Router();

router.use("/", indexController);
router.use("/auth", authController);
router.use("/user", userController);
