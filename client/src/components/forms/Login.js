import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createError } from "../../redux/slices/alertSlice";
import { login } from "../../redux/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();

  const errors = useSelector((state) => state.auth.errors);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  useEffect(() => {
    if (errors && errors.length > 0) {
      dispatch(createError(errors[errors.length - 1]));
    }
    //return () => dispatch(clearErrors());
  }, [dispatch, errors]);

  const loginHandler = (e) => {
    e.preventDefault();
    if (canSubmit) {
      console.log("logging in");
      dispatch(login({ username, password }));
    }
  };

  const canSubmit = username !== "" && password.length >= 4;

  return (
    <form className="user-login">
      <input
        className="form-input"
        type="text"
        placeholder="Username"
        name="username"
        autoComplete="off"
        onChange={handleUsernameChange}
        value={username}
      />
      <input
        className="form-input"
        type="password"
        placeholder="Password"
        name="password"
        autoComplete="off"
        value={password}
        onChange={handlePasswordChange}
      />
      <button className="btn" onClick={loginHandler}>
        Login
      </button>
    </form>
  );
};

export default Login;
