import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createError, createInfo } from "../../../../redux/slices/alertSlice";
import {
  changePassword,
  clearErrors as clearAuthErrors,
  tokenSelector,
} from "../../../../redux/slices/authSlice";

const UserSettings = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "oldPassword") {
      setOldPassword(e.target.value);
    } else if (e.target.name === "newPassword") {
      setNewPassword(e.target.value);
    }
  };
  const reset = () => {
    setOldPassword("");
    setNewPassword("");
  };

  const canSubmit = oldPassword.length >= 4 && newPassword.length >= 4;
  const dispatch = useDispatch();
  const errs = useSelector((state) => state.auth.errors);
  const token = useSelector(tokenSelector);
  const handleSubmit = () => {
    if (canSubmit) {
      const data = { oldPassword, newPassword };

      console.log("updating...");
      console.log(token);
      console.log(data);
      dispatch(changePassword({ token, data }))
        .then(unwrapResult)
        .then(() => {
          reset();
          dispatch(createInfo("Password updated"));
        });
    } else {
      console.log("cant");
    }
  };

  useEffect(() => {
    if (errs && errs.length > 0) {
      dispatch(createError(errs[errs.length - 1]));
      dispatch(clearAuthErrors());
    }
  }, [errs]);

  return (
    <div className="user-settings">
      <h4>Change Password</h4>
      <span className="username"></span>
      <input
        className="form-input medium"
        placeholder="Your old password"
        type="password"
        name="oldPassword"
        value={oldPassword}
        onChange={handleChange}
      />
      <input
        className="form-input medium"
        placeholder="New password"
        type="password"
        name="newPassword"
        value={newPassword}
        onChange={handleChange}
      />
      <button className="btn medium lime" onClick={handleSubmit}>
        update
      </button>
    </div>
  );
};

export default UserSettings;
