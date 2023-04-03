import { faker } from "@faker-js/faker";
import supertest from "supertest";
import app from "../../src/app";
import { createProject } from "../factories/projects-factory";
import { createSprint } from "../factories/sprints-factory";
import { createUser } from "../factories/users-factory";
import { cleanDb, generateValidToken } from "../helpers";

const server = supertest(app);

beforeAll(async () => {
  await cleanDb();
});

describe("POST /sprints", () => {
  describe("when token is invalid", () => {
    it("should be respond with status 401 if no token is given",async () => {
      const response = await server.post("/sprints");

      expect(response.status).toBe(401);
    });

    it("should be respond with status 401 if token is invalid", async () => {
        const token = faker.internet.userName();

        const response = await server.post("/sprints").set("Authorization", `Bearer ${token}`);
        
        expect(response.status).toBe(401);
    });
  });

  describe("When body is invalid", () => {
    it("should be respond with satus 400 if no body is given", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);

        const response = await server.post("/sprints").set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(400);
    });

    it("should be respond with status 400 if body is invalid", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const invalidBody = { [faker.name.firstName()]: faker.internet.userName() };

        const response = await server.post("/sprints").send(invalidBody).set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(400);
    });
  });

  describe("when credentials is valid", () => {
    it("should be respond with status 404 if no project to get sprints", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const sprint = {
            projectId: 0,
            number: 1,
        };

        const response = await server.post("/sprints").send(sprint).set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(404);
    });

    it("should be respond with status 401 if wrong userId or projectId",async () => {
        const user = await createUser();
        const user2 = await createUser();
        const token = await generateValidToken(user);
        const project = await createProject(user2);
        const sprint = {
            projectId: project.id,
            number: 1,
        };

        const response = await server.post("/sprints").send(sprint).set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(401);  
    });

    it("should be respond with status 409 if sprint number alredy exist", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const project = await createProject(user);
      const sprint = await createSprint(project.id);

      const newSprint = {
          projectId: project.id,
          number: sprint.number,
      };

      const response = await server.post("/sprints").send(newSprint).set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(409);
    });

    it("should be respond with status 201 and sprint", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const project = await createProject(user);

      const sprint = {
          projectId: project.id,
          number: 1,
      };

      const response = await server.post("/sprints").send(sprint).set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(201);

      expect(response.body).toEqual(expect.objectContaining({
        id: expect.any(Number),
        number: expect.any(Number),
        projectId: expect.any(Number),
        status: expect.any(String),
        createdAt: expect.any(String),
      }));
    });
  });
});

describe("GET /sprints/projectId", () => {
  describe("when token is invalid", () => {
    it("should be respond with status 401 if no token is given",async () => {
      const response = await server.get("/sprints/0");

      expect(response.status).toBe(401);
    });

    it("should be respond with status 401 if token is invalid", async () => {
        const token = faker.internet.userName();

        const response = await server.get("/sprints/0").set("Authorization", `Bearer ${token}`);
        
        expect(response.status).toBe(401);
    });
  });

  describe("when token is valid", () => {
    it("should be respond with status 400 if params is invalid", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.get("/sprints/a").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(400);
    });

    it("should be respond with status 404 if no project to get sprints", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.get("/sprints/0").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);
    });
    
    it("should be respond with status 401 if userId and project userId dont match", async () => {
      const user = await createUser();
      const user2 = await createUser(); 
      const project = await createProject(user2);
      const token = await generateValidToken(user);

      const response = await server.get(`/sprints/${project.id}`).set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(401);
    });

    it("should be respond with status 200 and sprints list", async () => {
      const user = await createUser();
      const project = await createProject(user);
      const token = await generateValidToken(user);
      await createSprint(project.id);

      const response = await server.get(`/sprints/${project.id}`).set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);

      expect(response.body).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          number: expect.any(Number),
          projectId: expect.any(Number),
          status: expect.any(String),
          createdAt: expect.any(String),
        })
      ]));
    });
  });
});