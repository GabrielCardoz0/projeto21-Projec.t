import sprintRepository from "../../repositories/sprints-repository";
import projectsRepository from "../../repositories/projects-repository";

export type Project = {
  name: string,
};

async function createProject(project: Project, userId: number) {
  const projects = await projectsRepository.getProjectsByUserId(userId);

  const projectsNames = projects.map(p => p.Project.name);

  if(projectsNames.includes(project.name)) throw { name: "ConflictError", message: "Project name alredy exist" };
  
  const newProject = await projectsRepository.createProject(project);

  if(!newProject) throw { name: "BadRequest", message: "Project could not be created" };

  await sprintRepository.createSprint({ projectId: newProject.id, number: 1 });

  return await projectsRepository.createProjectMiddleTable(userId, newProject.id);
};

async function getProjectsByUserId(userId: number) {
  const projects = await projectsRepository.getProjectsByUserId(userId);

  if(!projects) throw { name: "NotFoundError", message: "User dont have projects" };

  return { projects };
};

const projectsService = {
  getProjectsByUserId,
  createProject,
};

export default projectsService;
