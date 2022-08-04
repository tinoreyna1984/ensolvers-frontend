import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { useAuthStore } from "../hooks/useAuthStore";
import { SpinnerRoundOutlined } from 'spinners-react'
import { NotesPages } from "../notes/pages/NotesPages";

export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  //console.log(status);

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
