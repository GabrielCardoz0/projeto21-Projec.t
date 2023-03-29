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
    res.sendStatus(500);
  }
};