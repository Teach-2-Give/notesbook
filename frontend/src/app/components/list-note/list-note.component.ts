import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NoteService } from '../../services/note.service';
import { CreateNoteComponent } from '../create-note/create-note.component';

@Component({
  selector: 'app-list-note',
  standalone: true,
  imports: [CommonModule, CreateNoteComponent],
  templateUrl: './list-note.component.html',
  styleUrl: './list-note.component.css'
})
export class ListNoteComponent {
  note: any;
  showCreateForm: boolean = true;

  constructor() {}

  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;
  }
}
