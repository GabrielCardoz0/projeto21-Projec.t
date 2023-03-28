import { Request, Response } from "express";
import authService from "../services/auth-service";

export async function authController(req: Request, res: Response ) {
  const { email, password } = req.body;

  try {
    const token = await authService.signIn({ email, password });

    res.status(200).send({ token });
  } catch (error) {
    console.log(error);

    if(error.name === "NotFoundError") res.sendStatus(404);

    if(error.name === "UnauthorizedError") res.sendStatus(401);

    res.sendStatus(400);
  }
};
