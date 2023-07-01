import app from "@app";

const port = parseInt(process.env.PORT || "8080");

if (process.env.NODE_ENV !== "develop") {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
} else {
  app.listen(port, "127.0.0.1", () => {
    console.log(`App listening on port ${port}`);
  });
}
