import { faker } from "@faker-js/faker";
import { User } from "@prisma/client";
import prisma from "../../src/config/database";

export async function createProject(user: Omit<User, "password">) {
  const project = await prisma.project.create({
    data: {
        name: faker.internet.userName(),
        status: "w.i.p",
        createdAt: new Date(),
    }
  });

  await prisma.userProject.create({
    data: {
        userId: user.id,
        projectId: project.id,
    }
  });

  return project;
};
