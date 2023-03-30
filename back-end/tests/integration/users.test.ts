import supertest from "supertest";
import app from "../../src/app";
import { createUser } from "../factories/users-factory";
import { cleanDb } from "../helpers";
import { faker } from "@faker-js/faker";

const server = supertest(app);

beforeAll(async () => {
  await cleanDb();
});

describe("POST /users", () => {
  it("should respond with status 400 if body is not giver invalid", async () => {
    const response = await server.post("/users");

    expect(response.status).toBe(400);
  });

  it("should respond with status 400 if body is invalid", async () => {
    const invalidBody = { [faker.internet.userName()]: faker.lorem.word() };

    const response = await server.post("/users").send(invalidBody);

    expect(response.status).toBe(400);
  });

  it("should respond with status 409 if user email is alredy registered", async () => {
    const user = await createUser();

    delete user.id;

    const response = await server.post("/users").send(user);

    expect(response.status).toBe(409);
  });

  it("should be respond with status 201 and user informations without password if body is valid", async () => {
    const user = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(6),
    };

    const response = await server.post("/users").send(user);

    expect(response.status).toBe(201);

    expect(response.body).toEqual(expect.objectContaining({
      id: expect.any(Number),
      name: expect.any(String),
      email: expect.any(String),
    }));
  });
});
