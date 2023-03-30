import { Request, Response } from "express"; 
import userService from "../services/users-service";

export async function createNewUser(req: Request, res: Response) {
  const { email, password, name } = req.body;

  try {
    const user = await userService.createNewUser({name, email, password});

    res.status(201).send(user);
  } catch (error) {
    console.log(error);

    res.sendStatus(409);
  }
}