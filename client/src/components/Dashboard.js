import React, { useEffect } from "react";
import Nodes from "./pages/Nodes";
import Interfaces from "./pages/Interfaces";
import Errors from "./pages/Errors";
import Users from "./pages/Users";
import { useDispatch } from "react-redux";
import { getAll } from "../redux/users/usersSlice";

const Dashboard = ({ activeMenu, token }) => {
  const { nodes, interfaces, errors, users } = activeMenu;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAll(token));
  }, [dispatch, token]);
  return (
    <>
      {nodes && <Nodes />}
      {interfaces && <Interfaces />}
      {errors && <Errors />}
      {users && <Users />}
    </>
  );
};

export default Dashboard;
