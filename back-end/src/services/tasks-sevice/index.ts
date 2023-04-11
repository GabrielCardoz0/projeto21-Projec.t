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

  if(!project) throw { name: "BadRequest", message: "Project not found or deleted" };

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
};

async function deleteTaskById(userId: number, taskId: number) {
  const task = await taskRepository.getTaskById(taskId);

  if(!task) throw { name: "NotFoundError", message: "task not found" };

  const projects = await projectsRepository.getProjectsWithSprintsByUserId(userId);

  if(projects.length < 1) throw { name: "BadRequest", message: "Projects not found" };

  const sprintsList = projects.map(p => p.Project.Sprint);

  const sprintsIdList = [];

  sprintsList.map(s => s.map(data => sprintsIdList.push(data.id)));
  
  if(!sprintsIdList.includes(task.sprintId)) throw { name: "UnauthorizedError", message: "wrong task id, task and user sprints dont match" };

  return taskRepository.deleteTaskById(taskId);
};

const taskService = {
  createTask,
  getTasksBySprintId,
  deleteTaskById,
};

export default taskService;
