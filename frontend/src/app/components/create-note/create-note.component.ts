import { Component } from '@angular/core';
import { Note } from '../../interfaces/note.interface';
import { NoteService } from '../../services/note.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListNoteComponent } from '../list-note/list-note.component';

@Component({
  selector: 'app-create-note',
  standalone: true,
  imports: [CommonModule, FormsModule, ListNoteComponent],
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent {
  newNote: Note = {
    id: 0,
    title: '',
    content: '',
  };
  showCreateForm: boolean = false;

  constructor(private noteService: NoteService) {}

  createNote(): void {
    console.log('Creating note:', this.newNote);
    if (
      this.newNote.title.trim() === '' ||
      this.newNote.content.trim() === ''
    ) {
      return;
    }

    this.noteService.createNote(this.newNote);

    this.newNote = {
      id: 0,
      title: '',
      content: '',
    };

    this.toggleHideForm();
  }

  toggleHideForm(): void {
    this.showCreateForm = !this.showCreateForm;
    console.log('Form visibility:', this.showCreateForm);
  }
}


/**
 * CreateNoteComponent is responsible for creating new notes.
 * 
 * - newNote: Note - The new note being created.
 * - showCreateForm: boolean - Controls the visibility of the create note form.
 * 
 * Methods:
 * - createNote(): void - Creates a new note and adds it to the list via the NoteService.
 * - toggleHideForm(): void - Toggles the visibility of the create note form.
 * 
 * This component uses NoteService to manage the notes and imports CommonModule and FormsModule for template and form functionalities.
 */