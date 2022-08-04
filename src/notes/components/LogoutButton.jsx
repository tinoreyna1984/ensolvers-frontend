import React from "react";
import { useAuthStore } from "../../hooks/useAuthStore";

export const LogoutButton = () => {

  const {startLogout} = useAuthStore();

  return (
    <button className="btn btn-outline-danger" onClick={startLogout}>
      <i className="fas fa-sign-out-alt"></i>
      &nbsp; <span>Logout</span>
    </button>
  );
};
