import { Router } from "express";
import { authenticateToken } from "../middlewares/authentication-middleware";

const projectsRouter = Router();

projectsRouter.get("/", authenticateToken);

export { projectsRouter };
