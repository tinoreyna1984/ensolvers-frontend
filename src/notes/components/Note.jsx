import React from "react";
import { useUiStore } from "../../hooks/useUiStore";
import { useNotesStore } from "../../hooks/useNotesStore";
import { useAuthStore } from "../../hooks/useAuthStore";

export const Note = ({ note }) => {
  const { openNoteModal } = useUiStore();
  const { setActiveNote, startArchiveNote, startDeleteNote } = useNotesStore();

  const handleEdit = () => {
    openNoteModal();
    setActiveNote(note);
  };

  const handleArchive = async () => {
    await startArchiveNote(note);
  };

  const handleSetActive = async () => {
    await startArchiveNote(note, false);
  };

  const handleDelete = async () => {
    await startDeleteNote(note);
  };

  return (
    <li>
      <div className="card text-bg-light mb-3" style={{ maxWidth: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text text-truncate">{note.content}</p>
        </div>
        {!note.archived ? (
          <div className="btn-group justify-content-center" role="group">
            <button
              type="button"
              onClick={handleEdit}
              className="btn btn-primary"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={handleArchive}
              className="btn btn-outline-success"
            >
              Archive
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleSetActive}
            className="btn btn-success"
          >
            Set as active
          </button>
        )}
        <div className="card-footer">
          Status: {note.archived ? "Archived" : "Active"}
        </div>
      </div>
    </li>
  );
};
