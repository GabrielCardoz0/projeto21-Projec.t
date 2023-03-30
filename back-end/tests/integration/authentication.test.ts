import supertest from "supertest";
import app from "../../src/app";
import { cleanDb } from "../helpers";
import { faker } from "@faker-js/faker";
import { createUser } from "../factories/users-factory";

const server = supertest(app);

beforeAll(async () => {
  await cleanDb();
});

describe("POST /auth/sign-in", () => {
  describe("when body is invalid", () => {
    it("should respond with status 400 if no body is giver", async () => {
        const response = await server.post("/auth/sign-in");

        expect(response.status).toBe(400);
    });

    it("should be respond with status 400 if body is invalid", async () => {
        const invalidBody = { [faker.internet.userName()]: faker.lorem.word() };

        const response = await server.post("/auth/sign-in").send(invalidBody);

        expect(response.status).toBe(400);
    });
  });

  describe("when body is valid", () => {
    it("should be respond with status 401 if wrong email is given", async () => {
        const user = await createUser();

        delete user.id;

        user.email = faker.internet.email();

        const response = await server.post("/auth/sign-in").send(user);

        expect(response.status).toBe(401);
    });

    it("should be respond with status 401 if wrong password is given",async () => {
       const user = await createUser();
       
       delete user.id;

       user.password = faker.internet.password(7);

       const response = await server.post("/auth/sign-in").send(user);

       expect(response.status).toBe(401);
    });

    it("should be respond with status 200 and token if credentials are valid", async () => {
        const user = await createUser();

        delete user.id;

        const response = await server.post("/auth/sign-in").send(user);

        expect(response.status).toBe(200);

        expect(response.body).toEqual(expect.objectContaining({
            token: expect.any(String),
        }));
    });
  });
});
