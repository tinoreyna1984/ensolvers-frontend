import React from 'react'
import { useNotesStore } from '../../hooks/useNotesStore';
import { useUiStore } from '../../hooks/useUiStore';

export const AddNoteButton = () => {
  const { openNoteModal } = useUiStore();
  const { setActiveNote } = useNotesStore();

  const handleClickNew = () => {
    const activeNote = {title: 'Title', content: 'Content', categories: ['no-category']};
    openNoteModal();
    setActiveNote(activeNote);
  };

  return (
    <button className="btn btn-dark me-3" onClick={handleClickNew}>
        <i className="fas fa-add"></i>
        &nbsp; <span>Add note</span>
    </button>
  )
}
