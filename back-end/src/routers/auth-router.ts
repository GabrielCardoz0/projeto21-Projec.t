import { Router } from "express";
import { authController } from "../controllers/auth-controller";
import { validateBody } from "../middlewares/validation-middleware";
import { createUserSchema } from "../schemas/users-schema";

const authRouter = Router();

authRouter.post("/sign-in", validateBody(createUserSchema), authController);

export { authRouter };
