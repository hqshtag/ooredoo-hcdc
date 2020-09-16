import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createWarning } from "../../../../redux/slices/alertSlice";
import { tokenSelector } from "../../../../redux/slices/authSlice";
import { getAll, removeUser } from "../../../../redux/slices/usersSlice";
import AddUser from "../../users/forms/AddUser";
import ViewUsers from "../../users/partials/ViewUsers";

const UserManagement = () => {
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);

  const handleRemoveUser = (id) => {
    dispatch(removeUser({ id, token })).then(() => {
      dispatch(createWarning("User Deleted"));
      dispatch(getAll(token));
    });
  };
  return (
    <div className="users-management">
      <h3>Users Management</h3>
      <AddUser />
      <ViewUsers handleRemove={handleRemoveUser} />
    </div>
  );
};

export default UserManagement;
