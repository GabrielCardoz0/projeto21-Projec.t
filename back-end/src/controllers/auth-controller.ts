import { Request, Response } from "express"; 
import authService from "../services/auth-service";

export async function authController(req: Request, res: Response ) {
  const { email, password } = req.body;

  try {
    const token = await authService.signIn({ email, password });

    return res.status(200).send({ token });
  } catch (error) {
    console.log(error);
    
    return res.sendStatus(401);
  }
};
