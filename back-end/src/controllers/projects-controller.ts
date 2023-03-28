import { Request, Response } from "express";
import projectsService from "../services/projects-service";

export async function createProject(req: Request, res: Response) {
  const userId = res.locals.userId;

  const project = req.body;

  try {
    await projectsService.createProject(project, userId);

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    
    res.sendStatus(400);
  }
};

export async function getProjects(req: Request, res: Response) {
  const userId = res.locals.userId;

  try {
    const projectsList = await projectsService.getProjectsByUserId(userId);

    res.status(200).send(projectsList);
  } catch (error) {
    console.log(error);
    
    res.sendStatus(400);
  }
};
