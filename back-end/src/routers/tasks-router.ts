import { Router } from "express";
import { createTask, getTasks } from "../controllers/tasks-controller";
import { authenticateToken } from "../middlewares/authentication-middleware";
import { validateBody, validateParams } from "../middlewares/validation-middleware";
import { taskParamsSchema, taskSchema } from "../schemas/tasks-schema";

const taskRouter = Router();

taskRouter
  .all("/*", authenticateToken)
  .post("/", validateBody(taskSchema), createTask)
  .get("/:sprintId", validateParams(taskParamsSchema), getTasks);

export { taskRouter };
