export interface Note {
    id?: number;
    title: string;
    content: string;
    createdAt?: string;
    updatedAt?: string;
}

/**
 * Interface representing a Note.
 * 
 * Properties:
 * - id?: number - Optional unique identifier for the note.
 * - title: string - The title of the note.
 * - content: string - The content of the note.
 * - createdAt?: string - Optional creation timestamp.
 * - updatedAt?: string - Optional last update timestamp.
 */