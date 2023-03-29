import { Router } from "express";
import { createSprint, getSprintsByProjectId } from "../controllers/sprints-controller";
import { authenticateToken } from "../middlewares/authentication-middleware";
import { validateBody, validateParams } from "../middlewares/validation-middleware";
import { sprintParamsSchema, sprintSchema } from "../schemas/sprints-schema";

const sprintRouter = Router();

sprintRouter
  .all("/*", authenticateToken)
  .post("/", validateBody(sprintSchema), createSprint)
  .get("/:projectId", validateParams(sprintParamsSchema), getSprintsByProjectId);


export { sprintRouter };