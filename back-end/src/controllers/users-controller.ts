import { Request, Response } from "express";
import userService from "../services/users-service";

export async function createNewUser(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await userService.createNewUser({email, password});

    res.status(201).send(user);
  } catch (error) {
    console.log(error);

    if(error.name === "ConflictError") return res.sendStatus(409);

    res.sendStatus(400);
  }
}