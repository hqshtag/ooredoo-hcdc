import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createError } from "../../redux/slices/alertSlice";
import { login } from "../../redux/slices/authSlice";
import Input from "../partials/Input";

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

  const canSubmit = username !== "" && password.length >= 6;
  const validPassword = password.length >= 6;

  const empty = (str) => {
    return str.length === 0;
  };

  return (
    <form className="user-login">
      <Input
        type="text"
        placeholder="Username"
        name="username"
        onChange={handleUsernameChange}
        value={username}
      />
      <Input
        type="password"
        placeholder="Password"
        name="password"
        onChange={handlePasswordChange}
        value={password}
        description={
          !empty(password)
            ? validPassword
              ? ""
              : "password must be at least 6 characters long"
            : ""
        }
      />

      <button className="btn" onClick={loginHandler}>
        Login
      </button>
    </form>
  );
};

export default Login;
