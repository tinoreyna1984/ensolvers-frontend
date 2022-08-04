import React from "react";
import { Note } from "./Note";

export const NotesList = ({ notes }) => {
  const className =
    "pt-3 mt-3 list-unstyled border border-gray rounded p-5 shadow row row-cols-1 row-cols-md-3 g-4";

  const notesFound = notes.length > 0;
  //console.log(notesFound);

  return (
    <div className={className}>
      {notesFound ? (
        notes.map((note) => <Note key={note.id} note={note} />)
      ) : (
        <p>No notes found</p>
      )}
    </div>
    
  );
};
