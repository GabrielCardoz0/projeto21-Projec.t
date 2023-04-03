import projectsRepository from "../../repositories/projects-repository";
import sprintRepository from "../../repositories/sprints-repository";
import taskRepository from "../../repositories/tasks-repository";
import usersRepository from "../../repositories/users-repository";

export type Task = {
  sprintId: number,
  responsible: string,
  task: string,
  description: string,
  status: string,
  endsAt: Date,
  createdAt: Date,
};

async function createTask(userId: number, task: Task ) {
  const sprint = await sprintRepository.getSprintById(task.sprintId);

  if(!sprint) throw { name: "NotFoundError", message: "sprint not found" };
  
  const project = await projectsRepository.getProjectById(sprint.projectId);

  const user = await usersRepository.findUserById(userId);

  if(project.userId !== userId) throw { name: "UnauthorizedError", message: "wrong userId" };

  return taskRepository.createTask((task.responsible || user.name), task);
};

async function getTasksBySprintId(userId: number, sprintId: number) {
  const sprint = await sprintRepository.getSprintById(sprintId);

  if(!sprint) throw { name: "NotFoundError", message: "sprint not found" };
  
  const project = await projectsRepository.getProjectById(sprint.projectId);
  
  if(!project) throw { name: "NotFoundError", message: "project not found" };

  if(project.userId !== userId) throw { name: "UnauthorizedError", message: "wrong userId" };

  return taskRepository.getTasksBySprintId(sprintId);
}

const taskService = {
  createTask,
  getTasksBySprintId,
};

export default taskService;
