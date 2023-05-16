import express from "express";
import { router } from "./routes";

const app = express();
const port = parseInt(process.env.PORT || "8080");

app.use(express.json());

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
