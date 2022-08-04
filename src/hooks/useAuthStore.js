import { useDispatch, useSelector } from "react-redux";
import notesApi from "../api/notesApi";
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
} from "../redux/slices/auth/authSlice";
import { onLogoutNotes } from "../redux/slices/notes/notesSlice";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());

    try {
      const { data } = await notesApi.post("/auth", { email, password });
      //console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      console.log("startLogin ERROR: ", error);
      dispatch(onLogout("Usuario y/o contraseña incorrectos"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startRegister = async ({ name, email, password }) => {
    dispatch(onChecking());

    try {
      const { data } = await notesApi.post("/auth/new", {
        name,
        email,
        password,
      });
      //console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      console.log("startRegister ERROR: ", error.response.data.msg);
      dispatch(
        onLogout(
          error.response.data?.msg ||
            "Error en el registro, hablar con el administrador"
        )
      );
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await notesApi.get("/auth/renew");
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("token-init-date");
      dispatch(
        onLogout("Error en la autenticación, hablar con el administrador")
      );
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("token-init-date");
    dispatch(onLogoutNotes());
    dispatch(onLogout());
  };

  return {
    // Propiedades
    status,
    user,
    errorMessage,

    // Métodos
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};
