import { Router } from "express";
import { createTask, deleteTask, getTasks, updateTaskStatus } from "../controllers/tasks-controller";
import { authenticateToken } from "../middlewares/authentication-middleware";
import { validateBody, validateParams } from "../middlewares/validation-middleware";
import { taskParamsSchema, taskSchema, taskUpdateSchema } from "../schemas/tasks-schema";

const taskRouter = Router();

taskRouter
  .all("/*", authenticateToken)
  .post("/", validateBody(taskSchema), createTask)
  .get("/:sprintId", validateParams(taskParamsSchema), getTasks)
  .put("/", validateBody(taskUpdateSchema), updateTaskStatus)
  .delete("/:taskId", deleteTask);

export { taskRouter };
