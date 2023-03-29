import prisma from "../../config/database";
import { Sprint } from "../../services/sprints-service";

async function getSprintByNumber(number: number) {
  return prisma.sprint.findFirst({
    where: {
        number
    }
  });
};

async function createSprint(sprint: Sprint) {
  return prisma.sprint.create({
    data: {
        projectId: sprint.projectId,
        number: sprint.number,
        status: "w.i.p",
        createdAt: new Date()
    }
  });
};

const sprintRepository = {
  getSprintByNumber,
  createSprint,
};

export default sprintRepository;
