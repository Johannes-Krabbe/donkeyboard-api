import express from "express";
import { router } from "./routes";
import cors from "cors";

const app = express();
const port = parseInt(process.env.PORT || "8080");

app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(router);

if (process.env.NODE_ENV !== "develop") {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
} else {
  app.listen(port, "127.0.0.1", () => {
    console.log(`App listening on port ${port}`);
  });
}
