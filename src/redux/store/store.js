import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../slices/auth/authSlice";
import { notesSlice } from "../slices/notes/notesSlice";
import { uiSlice } from "../slices/ui/uiSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    notes: notesSlice.reducer,
    ui: uiSlice.reducer,
  },
  // corrige el warning del problema de fecha serializable en el navegador
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
