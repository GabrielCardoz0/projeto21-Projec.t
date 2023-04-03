import { faker } from "@faker-js/faker";
import app from "app";
import supertest from "supertest";
import { createProject } from "../factories/projects-factory";
import { createSprint } from "../factories/sprints-factory";
import { createUser } from "../factories/users-factory";
import { cleanDb, generateValidToken } from "../helpers";

const server = supertest(app);

beforeAll(async () => {
  await cleanDb();
});

describe("POST /tasks", () => {
  describe("when token is invalid", () => {
    it("should be respond with status 401 if no token is given",async () => {
      const response = await server.post("/tasks");

      expect(response.status).toBe(401);
    });

    it("should be respond with status 401 if token is invalid", async () => {
        const token = faker.internet.userName();

        const response = await server.post("/tasks").set("Authorization", `Bearer ${token}`);
        
        expect(response.status).toBe(401);
    });
  });

  describe("When body is invalid", () => {
    it("should be respond with satus 400 if no body is given", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);

        const response = await server.post("/tasks").set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(400);
    });

    it("should be respond with status 400 if body is invalid", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const invalidBody = { [faker.name.firstName()]: faker.internet.userName() };

        const response = await server.post("/tasks").send(invalidBody).set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(400);
    });
  });

  describe("when credentials is valid", () => {
    it("should be respond with status 404 if no sprint to create tasks", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const task = {
            sprintId: 0,
            responsible: faker.internet.userName(),
            task: faker.lorem.lines(),
        };

        const response = await server.post("/tasks").send(task).set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(404);
    });

    it("should be respond with status 401 if userId and project userId dont match", async () => {
        const user = await createUser();
        const user2 = await createUser();
        const token = await generateValidToken(user);
        const project = await createProject(user2);
        const sprint = await createSprint(project.id);

        const task = {
            sprintId: sprint.id,
            responsible: faker.internet.userName(),
            task: faker.lorem.lines(),
        };

        const response = await server.post("/tasks").send(task).set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(401);  
    });

    it("should be respond with status 201 and task", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const project = await createProject(user);
      const sprint = await createSprint(project.id);

      const task = {
          sprintId: sprint.id,
          responsible: faker.internet.userName(),
          task: faker.lorem.lines(),
      };

      const response = await server.post("/tasks").send(task).set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(201);
      
      expect(response.body).toEqual(expect.objectContaining({
        id: expect.any(Number),
        sprintId: expect.any(Number),
        responsible: expect.any(String),
        task: expect.any(String),
        description: expect.any(String),
        status: expect.any(String),
        endsAt: expect.any(Object),
        createdAt: expect.any(String),
      }));
    });
  });
});