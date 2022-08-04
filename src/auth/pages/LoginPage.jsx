import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useForm } from "../../hooks/useForm";
import "./LoginPage.css";

const loginFormFields = {
  loginEmail: "",
  loginPassword: "",
};

const registerFormFields = {
  registerName: "",
  registerEmail: "",
  registerPassword: "",
  registerPassword2: "",
};

export const LoginPage = () => {
  const { startLogin, startRegister, errorMessage } = useAuthStore();

  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm(loginFormFields);
  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPassword2,
    onInputChange: onRegisterInputChange,
  } = useForm(registerFormFields);

  const loginSubmit = (e) => {
    e.preventDefault();
    startLogin({ email: loginEmail, password: loginPassword });
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    if(registerPassword !== registerPassword2) {
      Swal.fire("Error", "Las contraseñas no coinciden", "error");
      return;
    }
    startRegister({ name: registerName, email: registerEmail, password: registerPassword });
  };

  useEffect(() => {
    if(errorMessage !== undefined) {
      Swal.fire('Error en el registro', errorMessage, 'error');
    }
  }, [errorMessage])
  

  return (
    <div className="container login-container">
      <h1 className="pb-2">NotesApp</h1>
      <div className="row">
        {/* Login */}
        <div className="col-md-6 login-form-1">
          <h3>Login</h3>
          <form onSubmit={loginSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                name="loginEmail"
                value={loginEmail}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="loginPassword"
                value={loginPassword}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        {/* Register */}
        <div className="col-md-6 login-form-2">
          <h3>Sign up</h3>
          <form onSubmit={registerSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="registerName"
                value={registerName}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="registerEmail"
                value={registerEmail}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="registerPassword"
                value={registerPassword}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm password"
                name="registerPassword2"
                value={registerPassword2}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Create account" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
