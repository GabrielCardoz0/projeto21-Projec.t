import projectsRepository from "../../repositories/projects-repository";

export type Project = {
  name: string,
}

async function createProject(project: Project, userId: number) {
  const newProject = await projectsRepository.createProject(project);

  if(!newProject) throw { name: "BadRequest", message: "Project could not be created" };

  return await projectsRepository.createProjectMiddleTable(userId, newProject.id);
};

async function getProjectsByUserId(userId: number) {
  const projects = await projectsRepository.getProjectsByUserId(userId);

  return { projects };
};

const projectsService = {
  getProjectsByUserId,
  createProject,
};

export default projectsService;
