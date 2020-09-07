import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/authSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const dispatch = useDispatch();
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
