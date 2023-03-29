import { Request, Response } from "express";
import sprintService from "../services/sprints-service";

export async function createSprint(req: Request, res: Response) {
  const userId = res.locals.userId;

  const sprint = req.body;

  try {
    const newSprint = await sprintService.createSprint(userId, sprint);

    res.status(201).send(newSprint);
  } catch (error) {
    console.log(error);
    if(error.name === "NotFoundError") res.sendStatus(404);
    
        if(error.name === "UnauthorizedError") res.sendStatus(401);
    
    if(error.name === "ConflictError") res.sendStatus(409);

    res.sendStatus(400);
  };
};