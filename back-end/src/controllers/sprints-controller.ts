import { Request, Response } from "express";
import sprintService from "../services/sprints-service";

export async function createSprint(req: Request, res: Response) {
  const userId = res.locals.userId;

  const sprint = req.body;

  try {
    const newSprint = await sprintService.createSprint(userId, sprint);

    return res.status(201).send(newSprint);
  } catch (error) {
    console.log(error);
    if(error.name === "NotFoundError") return res.sendStatus(404);
    
    if(error.name === "ConflictError") return res.sendStatus(409);

    return res.sendStatus(401);
  };
};

export async function getSprintsByProjectId(req: Request, res: Response) {
  const userId = res.locals.userId;

  const { projectId } = req.params;
  
  try {
    const sprints = await sprintService.getSprintsByProjectId(userId, Number(projectId));
  
    return res.status(200).send(sprints);
    
  } catch (error) {
    console.log(error);

    if(error.name === "NotFoundError") return res.sendStatus(404);
    
    return res.sendStatus(401);
  };
};