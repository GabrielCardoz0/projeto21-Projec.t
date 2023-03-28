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

    if(error.name === "UnauthorizedError") res.sendStatus(401);
    
    res.sendStatus(400);
  }
};
