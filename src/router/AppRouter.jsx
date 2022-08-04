import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { useAuthStore } from "../hooks/useAuthStore";
import { SpinnerRoundOutlined } from 'spinners-react'
import { NotesPages } from "../notes/pages/NotesPages";
import { useNotesStore } from "../hooks/useNotesStore";

export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore();
  const {
    categories,
    startLoadingCategories,
  } = useNotesStore();

  useEffect(() => {
    checkAuthToken();
    //if(categories)
      startLoadingCategories();
  }, []);

  //console.log(status);

  if (status === "checking") startLoadingCategories(); // force loading categories
  if (status === "checking") return <SpinnerRoundOutlined color='blue' size="75%" />;

  return (
    <Routes>
      {status === "not-authenticated" ? (
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<NotesPages />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}
      {/* <>
        <Route path="/auth/*" element={<LoginPage />} />
        <Route path="/*" element={<Navigate to="/auth/login" />} />
      </> */}
    </Routes>
  );
};
