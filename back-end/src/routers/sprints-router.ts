import { Router } from "express";
import { createSprint } from "../controllers/sprints-controller";
import { authenticateToken } from "../middlewares/authentication-middleware";
import { validateBody } from "../middlewares/validation-middleware";
import { sprintSchema } from "../schemas/sprints-schema";

const sprintRouter = Router();

sprintRouter
  .all("/*", authenticateToken)
  .post("/", validateBody(sprintSchema), createSprint);


export { sprintRouter };