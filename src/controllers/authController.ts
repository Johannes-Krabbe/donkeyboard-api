import { Request, Response, Router } from "express";
import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";
import { createJWT } from "../utils/auth";

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

authController.post("/signup", async (req, res) => {
  const { username, email, password, bio } = req.body as {
    username: string;
    email: string;
    password: string;
    bio: string;
  };

  const hashedPass = await argon2.hash(password);
  const newUser = await prisma.user.create({
    data: { username, email, password: hashedPass, bio },
  });

  const jwt = createJWT(newUser.id);

  res.status(201).json({ token: jwt });
});

authController.post("/login", async (req, res) => {
  const { email, password } = req.body as {
    email: string;
    password: string;
  };

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    res.status(401).send();
    return;
  }

  const validPassword: boolean = await argon2.verify(user.password, password);

  if (!validPassword) {
    res.status(401).send();
    return;
  }

  const jwt = createJWT(user.id);

  res.status(201).json({ token: jwt });
});
