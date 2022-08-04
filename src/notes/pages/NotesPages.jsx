import React, { useEffect, useState } from "react";
import { useNotesStore } from "../../hooks/useNotesStore";
import { useAuthStore } from "../../hooks/useAuthStore";
import { LogoutButton } from "../components/LogoutButton";
import { Dropdown } from "../components/Dropdown";
import { NotesList } from "../components/NotesList";
import { AddNoteButton } from "../components/AddNoteButton";
import { NoteModal } from "../components/NoteModal";

export const NotesPages = () => {
  const { notes, startLoadingNotes, startLoadingArchivedNotes } =
    useNotesStore();
  const { user } = useAuthStore();
  const notesStatus = localStorage.getItem("notes-status") || "active";

  //console.log(user.uid)

  useEffect( () => {
    async function loadNotes(){
      if (notesStatus === "active") {
        startLoadingNotes(user.uid);
      } else {
        startLoadingArchivedNotes(user.uid);
      }
    }
    loadNotes();
  }, []);

  const [value, setValue] = useState(notesStatus);
  const options = [
    { label: "Active notes", value: "active" },
    { label: "Archived notes", value: "archived" },
  ];

  const handleChange = (event) => {
    setValue(event.target.value);
    if (event.target.value === "active") {
      localStorage.setItem("notes-status", "active");
      startLoadingNotes(user.uid);
    } else {
      localStorage.setItem("notes-status", "archived");
      startLoadingArchivedNotes(user.uid);
    }
  };

  return (
    <div id="notes" className="container-flex border border-gray rounded p-4 shadow">
      <h1>Hello, {user.name}</h1>
      <h1>Your notes</h1>

      <Dropdown
        label="Check by status: "
        options={options}
        value={value}
        onChange={handleChange}
      />
      {(notesStatus === "active") && <AddNoteButton />}
      {(notesStatus === "active") && <NoteModal />}
      <LogoutButton />

      <NotesList notes={notes} />

      
    </div>
  );
};
