import { PrismaClient } from "@prisma/client";
import { DeepMockProxy } from "jest-mock-extended";

import prisma from "./client";

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

export const getClient = (): PrismaClient => {
  if (process.env.DB_ENV === "test") {
    return prismaMock;
  }
  return prisma;
};
