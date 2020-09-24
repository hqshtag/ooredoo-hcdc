import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  getAll,
  clearError as clearUsersError,
} from "../../../../redux/slices/usersSlice";
import { tokenSelector } from "../../../../redux/slices/authSlice";
import { createError, createInfo } from "../../../../redux/slices/alertSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const AddUser = () => {
  const token = useSelector(tokenSelector);
  const error = useSelector((state) => state.users.error);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const clear = () => {
    setUsername("");
    setPassword("");
  };

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (canSubmit) {
      console.log("adding user");
      dispatch(addUser({ username, password, token }))
        .then(unwrapResult)
        .then(() => {
          clear();
          dispatch(createInfo(`${username} registered`));
          dispatch(getAll(token));
        });
    }
    console.log("you can't");
  };

  useEffect(() => {
    if (error) {
      dispatch(createError(error));
      dispatch(clearUsersError());
    }
  }, [error]);

  const canSubmit = username !== "" && password.length >= 6;

  return (
    <form className="add_user">
      <h4>Add user</h4>
      <input
        className="form-input medium"
        type="text"
        placeholder="Username"
        name="username"
        autoComplete="off"
        onChange={handleUsernameChange}
        value={username}
      />
      <input
        className="form-input medium"
        type="password"
        placeholder="Password"
        name="password"
        autoComplete="off"
        value={password}
        onChange={handlePasswordChange}
      />
      <button className="btn medium lime" onClick={submitHandler}>
        Add user
      </button>
    </form>
  );
};

export default AddUser;
