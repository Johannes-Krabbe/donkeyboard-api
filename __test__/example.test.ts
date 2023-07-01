import app from "@app";
import supertest from "supertest";

const request = supertest(app);

test("tests GET / endpoint", async () => {
  const res = await request.get("/");
  expect(res.status).toBe(200);
});

test("tests POST / endpoint", async () => {
  const res = await request.post("/");
  expect(res.status).toBe(200);
  expect(res.body.method).toBe("POST");
});
