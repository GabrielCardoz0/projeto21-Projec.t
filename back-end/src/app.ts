import express from "express";
import cors from "cors";
import { UsersRouter } from "./routers/users-router";
import { authRouter } from "./routers/auth-router";
import { projectsRouter } from "./routers/projects-router";
import { notesRouter } from "./routers/notes-router";
import { sprintRouter } from "./routers/sprints-router";
import { taskRouter } from "./routers/tasks-router";

const app = express();

app
  .use(express.json())
  .use(cors())
  .get("/health", async (req, res) => res.send("OK!"))
  .use("/user", UsersRouter)
  .use("/auth", authRouter)
  .use("/project", projectsRouter)
  .use("/notes", notesRouter)
  .use("/sprints", sprintRouter)
  .use("/tasks", taskRouter);

export default app;
