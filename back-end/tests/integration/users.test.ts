import supertest from "supertest";
import app from "../../src/app";
import { createUser } from "../factories/users-factory"; 
import { cleanDb } from "../helpers";

const server = supertest(app);

beforeAll(async () => {
  await cleanDb();
});

describe("POST /users", () => {
  it("should respond with status 400 if body is invalid", async () => {
    const response = await server.post("/users");

    expect(response.status).toBe(400);
  });
});
