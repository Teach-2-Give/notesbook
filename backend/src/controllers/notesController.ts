import { Request, Response } from 'express';
import { createNoteService, getAllNotesService, getNoteByIdService, updateNoteByIdService, deleteNoteByIdService } from '../services/notesService';

export const createNote = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  try {
    const note = await createNoteService(title, content);
    res.status(201).json(note);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const notes = await getAllNotesService();
    res.status(200).json(notes);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const getNoteById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);  // Convert string to number
  try {
    const note = await getNoteByIdService(id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.status(200).json(note);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const updateNoteById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);  // Convert string to number
  const { title, content } = req.body;
  try {
    const note = await updateNoteByIdService(id, title, content);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.status(200).json(note);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const deleteNoteById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);  // Convert string to number
  try {
    const message = await deleteNoteByIdService(id);
    res.status(200).json({ message });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};
