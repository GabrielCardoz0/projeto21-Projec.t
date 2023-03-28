import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/database";

type JWTPayload = {
  userId: number,
};

export async function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header("Authorization");

  if(!authHeader) res.sendStatus(401);

  const token = authHeader.split(" ")[1];

  if(!token) res.sendStatus(401);

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

    const user = await prisma.user.findFirst({
        where: {
            id: userId
        }
    });

    if(!user) res.sendStatus(401);

    res.locals.userId = userId;

    return next();

  } catch (error) {
    console.log(error);

    res.sendStatus(401);
  }
};
