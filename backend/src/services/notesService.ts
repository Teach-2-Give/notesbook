import { Note } from '../interfaces/noteInterface';
import { createNote, getAllNotes, getNoteById, updateNoteById, deleteNoteById } from '../models/noteModel';

export const createNoteService = async (title: string, content: string): Promise<Note> => {
  return await createNote(title, content);
};

export const getAllNotesService = async (): Promise<Note[]> => {
  return await getAllNotes();
};

export const getNoteByIdService = async (id: number): Promise<Note | null> => {
  return await getNoteById(id);
};

export const updateNoteByIdService = async (id: number, title: string, content: string): Promise<Note | null> => {
  return await updateNoteById(id, title, content);
};

export const deleteNoteByIdService = async (id: number): Promise<string> => {
  const deleted = await deleteNoteById(id);
  if (!deleted) {
    throw new Error('Note not found');
  }
  return 'Note deleted successfully';
};
