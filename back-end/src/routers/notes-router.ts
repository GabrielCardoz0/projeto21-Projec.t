import { Router } from "express";
import { createNote, deleteNote, getNotes } from "../controllers/notes-controller";
import { authenticateToken } from "../middlewares/authentication-middleware";
import { validateBody, validateParams } from "../middlewares/validation-middleware";
import { noteSchema, noteParamsSchema } from "../schemas/notes-schema";

const notesRouter = Router();

notesRouter
  .all("/*", authenticateToken)
  .post("/", validateBody(noteSchema), createNote)
  .get("/:projectId", validateParams(noteParamsSchema), getNotes)
  .delete("/:noteId", deleteNote);

  export { notesRouter };
