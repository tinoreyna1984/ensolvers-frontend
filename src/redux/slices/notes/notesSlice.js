import { createSlice } from "@reduxjs/toolkit";

export const notesSlice = createSlice({
  name: "notes",
  initialState: {
    isLoadingNotes: true,
    notes: [],
    activeNote: null,
  },
  reducers: {
    onSetActiveNote: (state, { payload }) => {
      //console.log(payload);
      state.activeNote = payload;
    },
    onAddNewNote: (state, { payload }) => {
      state.notes.push(payload);
      state.activeNote = null;
    },
    onUpdateNote: (state, { payload }) => {
      state.notes = state.notes.map((note) => {
        if (note.id === payload.id) {
          return payload;
        }
        return note;
      });
      state.activeNote = null;
    },
    onDeleteNote: (state, { payload }) => {
      state.notes = state.notes.filter(
        (note) => note.id !== payload.id
      );
      state.activeNote = null;
    },
    onLoadNotes: (state, { payload }) => {
      state.notes = [];
      state.isLoadingNotes = true;
      //state.notes = payload;
      //console.log(payload);
      const {notes, uid } = payload;
      //console.log(uid);
      notes.forEach((note) => {
        /* const exists = state.notes.some((dbNote) => dbNote.user._id === uid);
        if (!exists) state.notes.push(note); */
        //console.log(note.user);
        if (note.user._id === uid) {
          state.notes.push(note);
        }
      });
    },
    onLoadArchivedNotes: (state, { payload }) => {
      state.notes = [];
      state.isLoadingNotes = true;
      //state.notes = payload;
      const {notes, uid } = payload;
      notes.forEach((note) => {
        /* const exists = state.notes.some((dbNote) => dbNote.id === note.id);
        if (!exists) state.notes.push(note); */
        if (note.user._id === uid) {
          state.notes.push(note);
        }
      });
    },
    onLogoutNotes: (state) => {
      state.isLoadingNotes = true;
      state.notes = [];
      state.activeNote = null;
    },
  },
});

export const { 
    onSetActiveNote,
    onAddNewNote,
    onUpdateNote,
    onDeleteNote,
    onLoadNotes,
    onLoadArchivedNotes,
    onLogoutNotes
 } = notesSlice.actions;
