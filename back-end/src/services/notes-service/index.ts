import noteRepository from "../../repositories/notes-repository";
import projectsRepository from "../../repositories/projects-repository";

export type Note = {
  id?: number,
  projectId: number,
  note: string,
}

async function createNote(userId: number, note: Note) {
  const project = await projectsRepository.getProjectById(note.projectId);

  if(!project) throw { name: "BadRequest", message: "Project id not found" };

  if(project.userId !== userId) throw { name: "UnauthorizedError", message: "Wrong userId" };

  return await noteRepository.createNote(note);
};

async function getNotesByProjectId(userId: number, projectId: number) {
  const project = await projectsRepository.getProjectById(projectId);

  if(!project) throw { name: "BadRequest", message: "Project id not found" };

  if(project.userId !== userId) throw { name: "UnauthorizedError", message: "Wrong userId" };

  return noteRepository.getNotesByProjectId(projectId);
}

const noteService = {
  createNote,
  getNotesByProjectId,
};

export default noteService;
