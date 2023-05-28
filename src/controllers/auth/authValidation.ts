import { z } from "zod";

const username = z
  .string()
  .refine((value) => /^[a-z0-9-_]{3,32}$/.test(value), "ERROR");

const email = z
  .string()
  .regex(new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$/), "ERROR");

export const registerBodySchema = z.object({
  username,
  email,
  password: z.string(),
  bio: z.string().nullish(),
});

export const loginBodySchema = z.object({
  email,
  password: z.string(),
});
