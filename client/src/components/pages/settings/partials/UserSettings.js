import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createError,
  createSuccess,
} from "../../../../redux/slices/alertSlice";
import {
  changePassword,
  clearErrors as clearAuthErrors,
  tokenSelector,
} from "../../../../redux/slices/authSlice";
import AddUser from "../../users/forms/AddUser";
import ChangePasswordForm from "../../users/forms/ChangePassword";

const UserSettings = ({ admin }) => {
  const dispatch = useDispatch();
  const errs = useSelector((state) => state.auth.errors);
  const token = useSelector(tokenSelector);

  const handleUpdatePassword = (oldPassword, newPassword) => {
    let data = { oldPassword, newPassword };
    dispatch(changePassword({ token, data }))
      .then(unwrapResult)
      .then(() => {
        dispatch(createSuccess("Password updated"));
      });
  };

  useEffect(() => {
    if (errs && errs.length > 0) {
      dispatch(createError(errs[errs.length - 1]));
      dispatch(clearAuthErrors());
    }
  }, [errs]);

  return (
    <div className="user-settings">
      <ChangePasswordForm submit={handleUpdatePassword} />
      {admin && <AddUser />}
    </div>
  );
};

export default UserSettings;
