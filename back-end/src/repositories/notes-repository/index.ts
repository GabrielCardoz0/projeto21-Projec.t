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

const noteRepository = {
  createNote,
};

export default noteRepository;
