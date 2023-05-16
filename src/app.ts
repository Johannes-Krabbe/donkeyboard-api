import express from "express";
import { PrismaClient } from "@prisma/client";
import { router } from "./routes";

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
