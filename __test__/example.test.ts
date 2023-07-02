import app from "@app";
import supertest from "supertest";
import { mockDeep, mockReset } from "jest-mock-extended";
import { PrismaClient } from "@prisma/client";
import { getClient } from "@context";

const prisma = getClient();

const request = supertest(app);

describe("Auth Controller", () => {
  beforeAll(async () => {
    process.env.DB_ENV = "test";
  });
  jest.mock("@client", () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>(),
  }));

  beforeEach(() => {
    mockReset(prisma);
  });

  test("tests GET / endpoint", async () => {
    const res = await request.get("/");
    expect(res.status).toBe(200);
  });

  test("tests POST / endpoint", async () => {
    const res = await request.post("/");
    expect(res.status).toBe(200);
    expect(res.body.method).toBe("POST");
  });

  test("test env", async () => {
    expect(process.env.DB_ENV).toBe("test");
  });
});
