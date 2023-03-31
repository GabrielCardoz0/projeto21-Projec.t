import { faker } from "@faker-js/faker";
import supertest from "supertest";
import app from "../../src/app";
import { createProject } from "../factories/projects-factory";
import { createUser } from "../factories/users-factory";
import { cleanDb, generateValidToken } from "../helpers";

const server = supertest(app);

beforeAll( async () => {
  await cleanDb();
});

describe("POST /notes", () => {
  describe("when token is invalid", () => {
    it("should be respond with status 401 if no token is given",async () => {
      const response = await server.post("/notes");

      expect(response.status).toBe(401);
    });

    it("should be respond with status 401 if token is invalid", async () => {
        const token = faker.internet.userName();

        const response = await server.post("/notes").set("Authorization", `Bearer ${token}`);
        
        expect(response.status).toBe(401);
    });
  });

  describe("When body is invalid", () => {
    it("should be respond with satus 400 if no body is given", async () => {
        const user = await createUser();

        const token = await generateValidToken(user);

        const response = await server.post("/notes").set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(400);
    });

    it("should be respond with status 400 if body is invalid", async () => {
        const invalidBody = { [faker.name.firstName()]: faker.internet.userName() };

        const user = await createUser();

        const token = await generateValidToken(user);

        const response = await server.post("/notes").send(invalidBody).set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(400);
    });
  });

  describe("When token and body is valid", () => {
    it("shoud be respond with status 400 if no project to create note", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);

        const note = {
            projectId: 0,
            note: faker.lorem.paragraph(),
        };

        const response = await server.post("/notes").send(note).set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(400);
    });

    it("should be respond with status 401 if wrong userId", async () => {
        const user = await createUser();
        const user2 = await createUser();
        const token = await generateValidToken(user);
        const wrongProject = await createProject(user2);

        const note = {
            projectId: wrongProject.id,
            note: faker.lorem.paragraph(),
        };

        const response = await server.post("/notes").send(note).set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(401);
    });

    it("should be respond with status 201", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const project = await createProject(user);

        const note = {
            projectId: project.id,
            note: faker.lorem.paragraph(),
        };

        const response = await server.post("/notes").send(note).set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(201);
    });
  });
});

describe("GET /notes/:projectId", () => {
  describe("when token is invalid", () => {
    it("should be respond with status 401 if no token is given",async () => {
      const response = await server.get("/notes");

      expect(response.status).toBe(401);
    });

    it("should be respond with status 401 if token is invalid", async () => {
        const token = faker.internet.userName();

        const response = await server.get("/notes").set("Authorization", `Bearer ${token}`);
        
        expect(response.status).toBe(401);
    });
  });

  describe("when token is valid", () => {
    it("should be respond with status 400 if wrong params", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);

        const response = await server.get("/notes/a").set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(400);
    });

    it("should be respond with status 400 if no project to get notes", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);

        const response = await server.get("/notes/0").set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(400);
    });

    it("should be respond with status 401 if wrong projectId", async () => {
        const user = await createUser();
        const user2 = await createUser();
        const token = await generateValidToken(user);
        const project = await createProject(user2);

        const response = await server.get(`/notes/${project.id}`).set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(401);
    });

    it("should be respond with status 200 and empty array", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const project = await createProject(user);

        const response = await server.get(`/notes/${project.id}`).set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);

        expect(response.body).toEqual([]);
    });
  });
});