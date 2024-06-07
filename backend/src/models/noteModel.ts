import pool from '../db';
import { Note } from '../interfaces/noteInterface';

export const createNote = async (title: string, content: string): Promise<Note> => {
  const result = await pool.query(
    'INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *',
    [title, content]
  );
  return result.rows[0];
};

export const getAllNotes = async (): Promise<Note[]> => {
  const result = await pool.query('SELECT * FROM notes ORDER BY created_at DESC');
  return result.rows;
};

export const getNoteById = async (id: number): Promise<Note | null> => {
  const result = await pool.query('SELECT * FROM notes WHERE id = $1', [id]);
  return result.rows[0] || null;
};

export const updateNoteById = async (id: number, title: string, content: string): Promise<Note | null> => {
  const result = await pool.query(
    'UPDATE notes SET title = $1, content = $2, created_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
    [title, content, id]
  );
  return result.rows[0] || null;
};

export const deleteNoteById = async (id: number): Promise<boolean> => {
  const result = await pool.query('DELETE FROM notes WHERE id = $1 RETURNING *', [id]);
  return result.rowCount !== null && result.rowCount > 0;
};