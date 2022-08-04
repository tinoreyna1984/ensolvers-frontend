import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import notesApi from "../api/notesApi";
import {
  onAddNewNote,
  onUpdateNote,
  onDeleteNote,
  onLoadArchivedNotes,
  onLoadNotes,
  onSetActiveNote,
  onLoadCategories,
  onLoadNotesByCategory,
} from "../redux/slices/notes/notesSlice";

export const useNotesStore = () => {
  const dispatch = useDispatch();

  const { notes, categories, activeNote } = useSelector((state) => state.notes);
  const { user } = useSelector((state) => state.auth);

  const setActiveNote = (note) => {
    dispatch(onSetActiveNote(note));
  };

  const startSavingNote = async (note) => {
    try {
      if (note.id) {
        await notesApi.put(`/notes/${note.id}`, note);
        dispatch(onUpdateNote({ ...note, user }));
      } else {
        const { data } = await notesApi.post("/notes", note);
        //console.log(response);
        dispatch(onAddNewNote({ ...note, id: data.note.id, user }));
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error on saving note", error.response.data.msg, "error");
    }
  };

  const startDeleteNote = async (note) => {
    //console.log(note.id)
    try {
      /* await notesApi.delete(`/notes/${note.id}`);
      dispatch(onDeleteNote(note)); */
      Swal.fire({
        title: "Delete a note",
        html: "Are you sure you want to delete this note?",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        icon: "warning",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire("Note deleted", "", "success");
          await notesApi.delete(`/notes/${note.id}`);
          dispatch(onDeleteNote(note));
          console.log("Deleted");
        } else Swal.fire("Note not deleted", "", "success");
        console.log("Not deleted");
      });
    } catch (error) {
      console.log(error);
      Swal.fire("Error on deleting note", error.response.data.msg, "error");
    }
  };

  const startArchiveNote = async (note, archive = true) => {
    try {
      await notesApi.put(`/notes/${note.id}`, { ...note, archived: archive });
      dispatch(onUpdateNote({ ...note, user }));
      if (archive === true) {
        Swal.fire(
          "Note archived successfully",
          "Click OK to close",
          "success"
        ).then(() => {
          startLoadingNotes(user.uid);
        });
      } else {
        Swal.fire(
          "Note unarchived successfully",
          "Click OK to close",
          "success"
        ).then(() => {
          startLoadingArchivedNotes(user.uid);
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire(
        "Error on archiving/unarchiving note",
        error.response.data.msg,
        "error"
      );
    }
  };

  const startLoadingNotes = async (uid) => {
    //console.log("user: ", user);
    try {
      const { data } = await notesApi.get("/notes");
      //console.log(data.notes);
      const { notes } = data;
      dispatch(onLoadNotes({ notes, uid }));
    } catch (error) {
      console.log(error);
    }
  };

  const startLoadingArchivedNotes = async (uid) => {
    try {
      const { data } = await notesApi.get("/notes/archive");
      //console.log(data.notes);
      const { notes } = data;
      dispatch(onLoadArchivedNotes({ notes, uid }));
    } catch (error) {
      console.log(error);
    }
  };

  const startLoadingCategories = async () => {
    try {
      const { data } = await notesApi.get("/notes/categories");
      //console.log(data.categories);
      const { categories } = data;
      dispatch(onLoadCategories( categories ));
    } catch (error) {
      console.log(error);
    }
  };

  const startLoadingNotesByCategory = async (category) => {
    /* startLoadingNotes(user.uid);
    dispatch(onLoadNotesByCategory( {notes, category} )); */
    try {
      const { data } = await notesApi.get("/notes");
      //console.log(data.notes);
      const { notes } = data;
      dispatch(onLoadNotesByCategory( {notes, category, user} ));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    notes,
    categories,
    activeNote,
    setActiveNote,
    startSavingNote,
    startDeleteNote,
    startArchiveNote,
    startLoadingNotes,
    startLoadingArchivedNotes,
    startLoadingCategories,
    startLoadingNotesByCategory,
  };
};
