import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isNoteModalOpen: false
    },
    reducers: {
        onOpenNoteModal: (state ) => {
            state.isNoteModalOpen = true;
        },
        onCloseNoteModal: (state ) => {
            state.isNoteModalOpen = false;
        },
    }
});

export const { onOpenNoteModal, onCloseNoteModal } = uiSlice.actions;

