import { Routes } from '@angular/router';
import { ListNoteComponent } from './components/list-note/list-note.component';
import { CreateNoteComponent } from './components/create-note/create-note.component';
import { UpdateNoteComponent } from './components/update-note/update-note.component';
import { ViewNoteComponent } from './components/view-note/view-note.component';

export const routes: Routes = [
  { path: '', redirectTo: '/notes', pathMatch: 'full' },
  { path: 'notes', component: ListNoteComponent },
  { path: 'notes/create', component: CreateNoteComponent },
  { path: 'notes/update/:id', component: UpdateNoteComponent },
  { path: 'notes/:id', component: ViewNoteComponent },
];