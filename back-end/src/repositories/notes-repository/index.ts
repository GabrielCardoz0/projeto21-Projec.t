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

async function getNoteById(id: number) {
  return await prisma.notes.findFirst({
    where: {
      id,
    }
  });
}

async function deleteNoteById(id: number) {
  return await prisma.notes.delete({
    where: {
      id,
    }
  });
}

const noteRepository = {
  createNote,
  getNotesByProjectId,
  getNoteById,
  deleteNoteById,
};

export default noteRepository;
