import prisma from "../../config/database";
import { Sprint } from "../../services/sprints-service";

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

async function getSprintById(id: number) {
  return prisma.sprint.findFirst({
    where: {
      id,
    }
  });
};

async function getSprintsByProjectId(projectId: number) {
  return prisma.sprint.findMany({
    where: {
      projectId,
    }
  });
};

async function deleteSprintById(id: number) {
  return prisma.sprint.delete({
    where: {
      id,
    }
  });
};

const sprintRepository = {
  createSprint,
  getSprintById,
  getSprintsByProjectId,
  deleteSprintById,
};

export default sprintRepository;
