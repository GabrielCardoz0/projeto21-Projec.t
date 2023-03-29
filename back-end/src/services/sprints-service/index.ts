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

  const sprintNumber = await sprintRepository.getSprintByNumber(sprint.number);

  if(sprintNumber) throw { name: "ConflictError", message: "sprint number alredy exist" };

  return await sprintRepository.createSprint(sprint);
};

const sprintService = {
  createSprint,
};

export default sprintService;
