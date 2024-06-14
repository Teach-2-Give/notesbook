import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Note } from '../interfaces/note.interface';


@Injectable({
  providedIn: 'root',
})


export class NoteService {
  private notes: Note[] = [];
  private notes$ = new BehaviorSubject<Note[]>(this.notes);

  constructor() {}

  getNotes(): Observable<Note[]> {
    return this.notes$.asObservable();
  }

  getNoteById(id: number): Observable<Note | undefined> {
    const note = this.notes.find((n) => n.id === id);
    return note
      ? new BehaviorSubject<Note>(note).asObservable()
      : new BehaviorSubject<Note | undefined>(undefined).asObservable();
  }

  createNote(note: Note): void {
    note.id = this.notes.length + 1;
    this.notes.push(note);
    this.notes$.next(this.notes);
  }

  updateNote(id: number, updatedNote: Note): void {
    const index = this.notes.findIndex((n) => n.id === id);
    if (index !== -1) {
      this.notes[index] = {
        ...updatedNote,
        id,
        createdAt: this.notes[index].createdAt,
      };
      this.notes$.next(this.notes);
    }
  }

  deleteNote(id: number): void {
    this.notes = this.notes.filter((n) => n.id !== id);
    this.notes$.next(this.notes);
  }
}

/**
 * NoteService provides methods to manage a collection of notes.
 * Uses BehaviorSubject from RxJS to maintain a reactive data source
 * and to provide a way for components to subscribe to updates.
 * 
 * Methods included in this service:
 * 
 * - getNotes(): Observable<Note[]>
 *   Returns an observable of the current list of notes.
 * 
 * - getNoteById(id: number): Observable<Note | undefined>
 *   Returns an observable of a specific note by its ID, or undefined if not found.
 * 
 * - createNote(note: Note): void
 *   Adds a new note to the collection, assigns it a unique ID, and updates the observable.
 * 
 * - updateNote(id: number, updatedNote: Note): void
 *   Updates an existing note by its ID with new content, preserving the creation date.
 * 
 * - deleteNote(id: number): void
 *   Removes a note from the collection by its ID and updates the observable.
 * 
 * The service ensures that all changes to the notes collection are reflected 
 * in the observable, allowing for real-time updates in any subscribing components.
 */
