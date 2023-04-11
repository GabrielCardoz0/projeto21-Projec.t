import taskRepository from "../../repositories/tasks-repository";
import projectsRepository from "../../repositories/projects-repository"
import sprintRepository from "../../repositories/sprints-repository";

export type Sprint = {
  number: number,
  projectId: number,
}

async function createSprint(userId: number, sprint: Sprint) {
  const project = await projectsRepository.getProjectById(sprint.projectId);

  if(!project) throw { name: "NotFoundError", message: "Project not found" };

  if(project.userId !== userId) throw { name: "UnauthorizedError", message: "wrong userId" };

  const sprintsList = await sprintRepository.getSprintsByProjectId(sprint.projectId);

  if(sprintsList.map(s => s.number).includes(sprint.number)) throw { name: "ConflictError", message: "sprint number alredy exist" };

  return await sprintRepository.createSprint(sprint);
};

async function getSprintsByProjectId(userId: number, projectId: number) {
  const project = await projectsRepository.getProjectById(projectId);

  if(!project) throw { name: "NotFoundError", message: "project not found" };

  if(project.userId !== userId) throw { name: "UnauthorizedError", message: "wrong userId" };

  return sprintRepository.getSprintsByProjectId(projectId);
};

async function deleteSprintById(userId: number, sprintId: number) {
  const sprint = await sprintRepository.getSprintById(sprintId);

  if(!sprint) throw { name: "NotFoundError", message: "sprint not found" };

  const project = await projectsRepository.getProjectById(sprint.projectId);

  if(!project) throw { name: "BadRequest", message: "Project could not be created" };

  if(project.userId !== userId) throw { name: "UnauthorizedError", message: "wrong userId" };

  await taskRepository.deleteTasksBySprintId(sprintId);

  return await sprintRepository.deleteSprintById(sprintId);
};

const sprintService = {
  createSprint,
  getSprintsByProjectId,
  deleteSprintById,
};

export default sprintService;
