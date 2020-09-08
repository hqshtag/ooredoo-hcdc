import React, { useEffect } from "react";
import AddUser from "./forms/AddUser";
import ViewUsers from "./partials/ViewUsers";
import { useSelector, useDispatch } from "react-redux";
import { getAll, removeUser } from "../../../redux/slices/usersSlice";
import { tokenSelector } from "../../../redux/slices/authSlice";

const Users = () => {
  const token = useSelector(tokenSelector);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeUser({ id, token })).then(() => {
      dispatch(getAll(token));
    });
  };
  useEffect(() => {
    dispatch(getAll(token));
  }, [dispatch, token]);
  return (
    <div className="users-page">
      <div>
        <AddUser />
        <div className="users-stats"></div>
      </div>
      <ViewUsers handleRemove={handleRemove} />
    </div>
  );
};

export default Users;
