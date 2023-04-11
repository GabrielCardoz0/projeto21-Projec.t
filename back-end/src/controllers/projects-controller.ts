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

    if(error.name === "ConflictError") return res.sendStatus(409);
    
    return res.sendStatus(400);
  }
};

export async function getProjects(req: Request, res: Response) {
  const userId = res.locals.userId;

  try {
    const projectsList = await projectsService.getProjectsByUserId(userId);

    return res.status(200).send(projectsList);
  } catch (error) {
    console.log(error);
    
    return res.sendStatus(404);
  }
};

export async function deleteProject(req: Request, res: Response) {
  const { userId } = res.locals
  const { projectId } = req.params
  try {
    await projectsService.deleteProjectById(userId, Number(projectId));

    return res.sendStatus(204);
  } catch (error) {
    console.log(error);

    if(error.name === "NotFoundError") return res.sendStatus(404);
    
    return res.sendStatus(401);
  }
};
