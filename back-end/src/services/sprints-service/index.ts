import projectsRepository from "../../repositories/projects-repository"
import sprintRepository from "../../repositories/sprints-repository";

export type Sprint = {
  number: number,
  projectId: number,
}

export async function createSprint(userId: number, sprint: Sprint) {
  const project = await projectsRepository.getProjectById(sprint.projectId);

  if(!project) throw { name: "NotFoundError", message: "Project not found" };

  if(project.userId !== userId) throw { name: "UnauthorizedError", message: "wrong userId" };

  const sprintNumber = await sprintRepository.getSprintByNumber(Number(sprint.number));

  if(sprintNumber) throw { name: "ConflictError", message: "sprint number alredy exist" };

  return await sprintRepository.createSprint(sprint);
};

export async function getSprintsByProjectId(userId: number, projectId: number) {
  const project = await projectsRepository.getProjectById(projectId);

  if(!project) throw { name: "NotFoundError", message: "project not found" };

  if(project.userId !== userId) throw { name: "UnauthorizedError", message: "wrong userId" };

  return sprintRepository.getSprintsByProjectId(projectId);
}

const sprintService = {
  createSprint,
  getSprintsByProjectId,
};

export default sprintService;
