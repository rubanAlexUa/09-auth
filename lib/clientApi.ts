import { nextServer } from "@/lib/api";
import type { Note, NoteFormValues } from "@/types/note";

interface NoteServiceProps {
  query: string;
  page: number;
  tag?: string;
}

interface NoteResponce {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({ query, page, tag }: NoteServiceProps) => {
  const res = await nextServer.get<NoteResponce>(`/notes`, {
    params: {
      tag,
      search: query,
      page,
      perPage: 12,
    },
  });
  return res.data;
};

export const fetchNoteById = async (id: string) => {
  const res = await nextServer.get<Note>(`/notes/${id}`, {});
  return res.data;
};

export const createNote = async (newTodo: NoteFormValues): Promise<Note> => {
  const res = await nextServer.post<Note>("/notes", newTodo, {});
  return res.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const res = await nextServer.delete<Note>(`/notes/${noteId}`, {});
  return res.data;
};
