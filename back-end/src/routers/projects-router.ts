import { Router } from "express";
import { createProject, deleteProject, getProjects } from "../controllers/projects-controller";
import { authenticateToken } from "../middlewares/authentication-middleware";
import { validateBody } from "../middlewares/validation-middleware";
import { projectSchema } from "../schemas/project-schema";

const projectsRouter = Router();

projectsRouter
  .all("/*", authenticateToken)
  .post("", validateBody(projectSchema), createProject)  
  .get("", getProjects)
  .delete("/:projectId", deleteProject);

export { projectsRouter };
