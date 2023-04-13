import prisma from "../../config/database";
import { Task } from "../../services/tasks-sevice";

async function createTask(responsible: string, task: Task) {
  return prisma.task.create({
    data: {
        sprintId: task.sprintId,
        responsible: responsible,
        task: task.task,
        description: task.description || "",
        status: task.status || "backlog",
        endsAt: task.endsAt || null,
        createdAt: new Date(),
    }
  });
};

async function getTasksBySprintId(sprintId: number) {
  return prisma.task.findMany({
    where: {
      sprintId,
    }
  });
};

async function getTaskById(id: number) {
  return prisma.task.findFirst({
    where: {
      id,
    }
  });
};

async function deleteTaskById(id: number) {
  return prisma.task.delete({
    where: {
      id,
    }
  });
};

async function deleteTasksBySprintId(sprintId: number) {
  return prisma.task.deleteMany({
    where: {
      sprintId,
    }
  });
};

async function updateTask(task: Task) {
  return prisma.task.update({
    data: {
      status: task.status,
    },
    where: {
      id: task.id,
    }
  });
}

const taskRepository = {
  createTask,
  getTasksBySprintId,
  getTaskById,
  deleteTaskById,
  deleteTasksBySprintId,
  updateTask,
};

export default taskRepository;
