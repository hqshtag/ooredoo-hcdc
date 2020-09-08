import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, getAll } from "../../../../redux/slices/usersSlice";
import { tokenSelector } from "../../../../redux/slices/authSlice";

const AddUser = () => {
  const token = useSelector(tokenSelector);
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
      dispatch(addUser({ username, password, token })).then(() => {
        dispatch(getAll(token));
        clear();
      });
    }
    console.log("you can't");
  };

  const canSubmit = username !== "" && password.length >= 4;
  return (
    <form className="add_user">
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
