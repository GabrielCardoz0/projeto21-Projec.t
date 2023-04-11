import { Router } from "express";
import { authController } from "../controllers/auth-controller";
import { validateBody } from "../middlewares/validation-middleware";
import { userCredentialsSchema } from "../schemas/users-schema";

const authRouter = Router();

authRouter.post("/sign-in", validateBody(userCredentialsSchema), authController);

export { authRouter };
