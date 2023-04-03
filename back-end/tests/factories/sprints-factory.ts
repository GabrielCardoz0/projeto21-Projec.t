import prisma from "../../src/config/database";

export async function createSprint(projectId: number) {
  return prisma.sprint.create({
    data: {
        projectId,
        number: 0,
        createdAt: new Date(),
        status: "w.i.p",
    }
  });
};