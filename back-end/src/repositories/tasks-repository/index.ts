import prisma from "../../config/database";
import { Task } from "../../services/tasks-sevice";

async function createTask(responsible: string, task: Task) {
  return prisma.task.create({
    data: {
        sprintId: task.sprintId,
        responsible: responsible,
        task: task.task,
        description: task.description || "",
        status: task.status || "w.i.p",
        endsAt: task.endsAt || null,
        createdAt: new Date(),
    }
  });
};

async function getTasksBySprintId(id: number) {
  return prisma.task.findMany({
    where: {
      id,
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
}

const taskRepository = {
  createTask,
  getTasksBySprintId,
  getTaskById,
  deleteTaskById,
};

export default taskRepository;
