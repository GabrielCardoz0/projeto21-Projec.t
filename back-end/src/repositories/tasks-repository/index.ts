import prisma from "../../config/database";
import { Task } from "../../services/tasks-sevice";

async function createTask(responsible: string, task: Task) {
  return prisma.task.create({
    data: {
        sprintId: task.sprintId,
        responsible: responsible || "",
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
}

const taskRepository = {
  createTask,
  getTasksBySprintId,
};

export default taskRepository;
