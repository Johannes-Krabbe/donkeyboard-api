import express from "express";
import { router } from "./routes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(router);

export default app;
