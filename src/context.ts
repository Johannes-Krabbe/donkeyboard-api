import { PrismaClient } from "@prisma/client";

import prisma from "./client";

// Tests replace ./client with a jest-mock-extended deep mock (see __test__/), so this returns the
// mock there and the real client everywhere else. Typed without jest-mock-extended so production
// builds don't need dev dependencies.
export const getClient = (): PrismaClient => prisma;
