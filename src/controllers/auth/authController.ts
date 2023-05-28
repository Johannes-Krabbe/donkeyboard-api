import { Request, Response, Router } from "express";
import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";
import { createJWT } from "@utils/auth";
import { TypedRequestBody, validateRequest } from "zod-express-middleware";
import { loginBodySchema, registerBodySchema } from "./authValidation";

export const authController = Router();

const prisma = new PrismaClient();

/**
 * Returns 200.
 */
authController.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    res.json(users);
  })
);

authController.post(
  "/register",
  validateRequest({ body: registerBodySchema }),
  asyncHandler(
    async (req: TypedRequestBody<typeof registerBodySchema>, res: Response) => {
      const { username, email, password, bio } = req.body;

      // check if username or email is already in use
      const usernameUser = await prisma.user.findUnique({
        where: { username },
      });
      const emailUser = await prisma.user.findUnique({ where: { email } });
      if (usernameUser || emailUser) {
        res.status(400).json({
          error: true,
          message: "Username or Email is already in use",
        });
        return;
      }

      // create user
      const hashedPass = await argon2.hash(password);
      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPass,
          bio: bio ? bio : "Hello there, I am using Donkeytype!",
        },
      });

      // generate JWT
      const jwt = createJWT(newUser.id);

      res.status(201).json({ token: jwt });
    }
  )
);

authController.post(
  "/login",
  validateRequest({ body: loginBodySchema }),
  asyncHandler(
    async (req: TypedRequestBody<typeof loginBodySchema>, res: Response) => {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        res.status(401).json({
          error: true,
          message: "Invalid Email or Password",
        });
        return;
      }

      const validPassword: boolean = await argon2.verify(
        user.password,
        password
      );

      if (!validPassword) {
        res.status(401).json({
          error: true,
          message: "Invalid Email or Password",
        });
        return;
      }

      const jwt = createJWT(user.id);

      res.status(201).json({ token: jwt });
    }
  )
);
