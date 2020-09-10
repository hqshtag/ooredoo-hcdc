import React, { useEffect } from "react";
import Nodes from "./pages/nodes/Nodes";
import Interfaces from "./pages/interfaces/Interfaces";
import Errors from "./pages/errors/Errors";
import Users from "./pages/users/Users";
import { useDispatch } from "react-redux";
import { getAll as getAllUsers } from "../redux/slices/usersSlice";
import { getAll as getAllF5 } from "../redux/slices/f5Slice";
import { getAll as getAllNodes } from "../redux/slices/nodeSlice";
import {
  getAll as getAllInterfaces,
  select as selectInterface,
} from "../redux/slices/interfaceSlice";
import Loadbalancer from "./pages/loadbalancer/Loadbalancer";
import { unwrapResult } from "@reduxjs/toolkit";

const Dashboard = ({ activeMenu, token }) => {
  const { nodes, interfaces, errors, loadbalancer, users } = activeMenu;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers(token));
    dispatch(getAllF5(token));
    dispatch(getAllNodes(token));
    dispatch(getAllInterfaces(token))
      .then(unwrapResult)
      .then((res) => dispatch(selectInterface(res.data.payload[0])));
  }, [dispatch, token]);
  return (
    <>
      {loadbalancer && <Loadbalancer />}
      {nodes && <Nodes />}
      {interfaces && <Interfaces />}
      {errors && <Errors />}
      {users && <Users />}
    </>
  );
};

export default Dashboard;
