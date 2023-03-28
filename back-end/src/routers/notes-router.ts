import { Router } from "express";
import { createNote } from "../controllers/notes-controller";
import { authenticateToken } from "../middlewares/authentication-middleware";
import { validateBody, validateParams } from "../middlewares/validation-middleware";
import { noteSchema } from "../schemas/notes-schema";

const notesRouter = Router();

notesRouter
  .post("/", authenticateToken, validateBody(noteSchema), createNote);

  export { notesRouter };
