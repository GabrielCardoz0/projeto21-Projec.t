import { Router } from "express";
import { createTask } from "../controllers/tasks-controller";
import { authenticateToken } from "../middlewares/authentication-middleware";
import { validateBody } from "../middlewares/validation-middleware";
import { taskSchema } from "../schemas/tasks-schema";

const taskRouter = Router();

taskRouter
  .post("/", authenticateToken, validateBody(taskSchema), createTask);

export { taskRouter };
