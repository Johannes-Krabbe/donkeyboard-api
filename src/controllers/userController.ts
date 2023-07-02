import { Request, Response, Router } from "express";
import asyncHandler from "express-async-handler";
import { getClient } from "@context";

export const userController = Router();

const prisma = getClient();

/**
 * Returns 200.
 */
userController.get(
  "/:username",
  asyncHandler(async (req: Request, res: Response) => {
    const { username } = req.params as {
      username: string;
    };

    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      res.status(404).send();
      return;
    }

    res.status(200).json({ username: user.username, bio: user.bio });
  })
);
