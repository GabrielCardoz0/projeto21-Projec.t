import { faker } from "@faker-js/faker";
import supertest from "supertest";
import app from "../../src/app";
import { createProject } from "../factories/projects-factory";
import { createUser } from "../factories/users-factory";
import { cleanDb, generateValidToken } from "../helpers";

const server = supertest(app);

beforeAll(async () => {
  await cleanDb();
});

describe("POST /projects", () => {
  describe("when token is invalid", () => {
    it("should be respond with status 401 if no token is given",async () => {
      const response = await server.post("/projects");

      expect(response.status).toBe(401);
    });

    it("should be respond with status 401 if token is invalid", async () => {
        const token = faker.internet.userName();

        const response = await server.post("/projects").set("Authorization", `Bearer ${token}`);
        
        expect(response.status).toBe(401);
    });
  });

  describe("When body is invalid", () => {
    it("should be respond with satus 400 if no body is given", async () => {

        const user = await createUser();

        const token = await generateValidToken(user);

        const response = await server.post("/projects").set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(400);
    });

    it("should be respond with status 400 if body is invalid", async () => {
        const invalidBody = { [faker.name.firstName()]: faker.internet.userName() };

        const user = await createUser();

        const token = await generateValidToken(user);

        const response = await server.post("/projects").send(invalidBody).set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(400);
    });
  });

  describe("When token and body is valid", () => {
    it("shoud be respond with status 400 if project name alredy exist", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const project = await createProject(user);

        delete project.createdAt
        delete project.id
        delete project.status;

        const response = await server.post("/projects").send(project).set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(409);
    });

    it("should be respond with status 201", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const project = {
          name: faker.internet.userName(),
        };

        const response = await server.post("/projects").send(project).set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(201);
    });
  });
});

describe("GET /projects", () => {
    describe("when token is invalid", () => {
      it("should be respond with status 401 if no token is given",async () => {
        const response = await server.get("/projects");
  
        expect(response.status).toBe(401);
      });
  
      it("should be respond with status 401 if token is invalid", async () => {
          const token = faker.internet.userName();
  
          const response = await server.get("/projects").set("Authorization", `Bearer ${token}`);
  
          console.log(response.body);
          
          expect(response.status).toBe(401);
      });
    });
  
    describe("When token is valid", () => {
        it("should be respond with status 200 and empty array", async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
    
            const response = await server.get("/projects").set("Authorization", `Bearer ${token}`);
    
            expect(response.status).toBe(200);
  
            expect(response.body.projects).toEqual([]);
        });

      it("should be respond with status 200 and projects list", async () => {
          const user = await createUser();
          const token = await generateValidToken(user);
          await createProject(user);
  
          const response = await server.get("/projects").set("Authorization", `Bearer ${token}`);
  
          expect(response.status).toBe(200);

          expect(response.body.projects[0].userId).toBe(user.id);
      });
    });
});