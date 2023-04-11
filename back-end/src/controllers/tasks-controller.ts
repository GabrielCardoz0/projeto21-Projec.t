import { Request, Response } from "express";
import taskService from "../services/tasks-sevice";

export async function createTask(req: Request, res: Response) {
  const userId = res.locals.userId;

  const task = req.body;
  try {
    const newTask = await taskService.createTask(userId, task);

    res.status(201).send(newTask);
  } catch (error) {
    console.log(error);
    
    if(error.name === "NotFoundError") return res.sendStatus(404);

    if(error.name === "UnauthorizedError") return res.sendStatus(401);
    
    return res.sendStatus(400);
  }
};

export async function getTasks(req: Request, res: Response) {
  const userId = res.locals.userId;

  const { sprintId } = req.params;

  try {
    const tasks = await taskService.getTasksBySprintId(userId, Number(sprintId));

    res.status(200).send(tasks);
  } catch (error) {
    console.log(error);
    
    if(error.name === "NotFoundError") return res.sendStatus(404);
    
    if(error.name === "UnauthorizedError") return res.sendStatus(401);

    return res.sendStatus(400);
  }
};

export async function deleteTask(req: Request, res: Response) {
  const userId = res.locals.userId;

  const { taskId } = req.params;
  try {
    await taskService.deleteTaskById(userId, Number(taskId));

    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    
    if(error.name === "NotFoundError") return res.sendStatus(404);
    
    if(error.name === "UnauthorizedError") return res.sendStatus(401);

    return res.sendStatus(400);
  }
};
