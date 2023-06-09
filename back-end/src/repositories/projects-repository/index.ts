import prisma from "../../config/database";
import { Project } from "../../services/projects-service";

async function createProject(project: Project) {
  return prisma.project.create({
    data: {
        name: project.name,
        status: "w.i.p",
        createdAt: new Date(),
    }
  });
};

async function createProjectMiddleTable(userId: number, projectId: number) {
  return prisma.userProject.create({
    data: {
        userId,
        projectId,
    }
  });
};

async function getProjectsByUserId(userId: number) {
  return prisma.userProject.findMany({
    where: {
        userId,
    },
    include: {
        Project: true,
    }
  });
};

async function getProjectById(projectId: number) {
  return prisma.userProject.findFirst({
    where: {
      projectId,
    },
    include: {
      Project: true,
    }
  });
};

async function deleteUserProjectById(id: number) {
  return prisma.userProject.delete({
    where: {
      id,
    }
  });
};

async function deleteProjectById(id: number) {
  return prisma.project.delete({
    where: {
      id,
    }
  });
};

async function getProjectsWithSprintsByUserId(userId: number) {
  return prisma.userProject.findMany({
    where: {
      userId,
    },
    include: {
      Project: {
        include: {
          Sprint: true,
        }
      }
    }
  });
}

const projectsRepository = {
  getProjectsByUserId,
  createProject,
  createProjectMiddleTable,
  getProjectById,
  deleteProjectById,
  deleteUserProjectById,
  getProjectsWithSprintsByUserId,
};

export default projectsRepository;
