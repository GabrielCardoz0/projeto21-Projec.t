import prisma from "../../config/database";
import { Note } from "../../services/notes-service";

async function createNote(note: Note) {
  return prisma.notes.create({
    data: {
        projectId: note.projectId,
        note: note.note,
        createdAt: new Date(),
    }
  });
};

async function getNotesByProjectId(projectId: number) {
  return prisma.notes.findMany({
    where: {
        projectId,
    }
  });
}

const noteRepository = {
  createNote,
  getNotesByProjectId,
};

export default noteRepository;
