import { Request, Response } from "express";
import noteService from "../services/notes-service";

export async function createNote(req: Request, res: Response) {
  const note = req.body;

  const userId = res.locals.userId;

  try {
    await noteService.createNote(userId, note);

    res.sendStatus(201);
  } catch (error) {
    console.log(error);

    if(error.name === "UnauthorizedError") return res.sendStatus(401);

    return res.sendStatus(400);
  }
};

export async function getNotes(req: Request, res: Response) {
  const { projectId } = req.params;

  const userId = res.locals.userId;
  try {
    const notes = await noteService.getNotesByProjectId(userId, Number(projectId));

    return res.status(200).send(notes);
  } catch (error) {
    console.log(error);

    if(error.name === "UnauthorizedError") return res.sendStatus(401);
    
    return res.sendStatus(400);
  }
};
