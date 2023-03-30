import prisma from "../src/config/database";
import jwt from "jsonwebtoken";

export type User = {
  id: number,
  email: string,
  name: string
  password?: string
};

export async function cleanDb() {
  await prisma.task.deleteMany({});
  await prisma.sprint.deleteMany({});
  await prisma.notes.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.userProject.deleteMany({});
  await prisma.user.deleteMany({});
};

export async function generateValidToken(user: User) {
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  return token;
};
