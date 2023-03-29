import { Router } from "express"; 
import { createNewUser } from "../controllers/users-controller";
import { validateBody } from "../middlewares/validation-middleware";
import { createUserSchema } from "../schemas/users-schema";

const UsersRouter = Router();

UsersRouter.post("/", validateBody(createUserSchema), createNewUser );

export { UsersRouter };
