import noteRepository from "../../repositories/notes-repository";
import projectsRepository from "../../repositories/projects-repository";

export type Note = {
  id?: number,
  projectId: number,
  note: string,
}

async function createNote(userId: number, note: Note) {
  const project = await projectsRepository.getProjectById(note.projectId);

  console.log(project);

  if(!project) throw { name: "BadRequest", message: "Project id not found" };

  if(project.userId !== userId) throw { name: "UnauthorizedError", message: "Wrong userId" };

  return await noteRepository.createNote(note);
};

const noteService = {
  createNote,
};

export default noteService;
