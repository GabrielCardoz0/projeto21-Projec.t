import express from "express";
import cors from "cors";
import { UsersRouter } from "./routers/users-router";
import { authRouter } from "./routers/auth-router";
import { projectsRouter } from "./routers/projects-router";
import { notesRouter } from "./routers/notes-router";

const app = express();

app
  .use(express.json())
  .use(cors())
  .get("/health", async (req, res) => res.send("OK!"))
  .use("/users", UsersRouter)
  .use("/auth", authRouter)
  .use("/project", projectsRouter)
  .use("/notes", notesRouter);

export default app;