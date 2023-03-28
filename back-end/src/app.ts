import express from "express";
import cors from "cors";
import { UsersRouter } from "./routers/users-router";
import { authRouter } from "./routers/auth-router";

const app = express();

app
  .use(express.json())
  .use(cors())
  .get("/health", async (req, res) => res.send("OK!"))
  .use("/users", UsersRouter)
  .use("/auth", authRouter);

export default app;