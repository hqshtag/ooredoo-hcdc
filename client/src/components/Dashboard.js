import React, { useEffect } from "react";
import Nodes from "./pages/nodes/Nodes";
import Interfaces from "./pages/interfaces/Interfaces";
import Errors from "./pages/errors/Errors";
import Users from "./pages/users/Users";
import Settings from "./pages/settings/Settings";
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
import { clearErrors as clearAuthErrors } from "../redux/slices/authSlice";
import { createSuccess } from "../redux/slices/alertSlice";

const Dashboard = ({ activeMenu, token }) => {
  const { nodes, interfaces, errors, loadbalancer, settings } = activeMenu;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearAuthErrors());
    dispatch(createSuccess("Logged in"));
    dispatch(getAllUsers(token));
    dispatch(getAllF5(token));
    dispatch(getAllNodes(token));
    dispatch(getAllInterfaces(token))
      .then(unwrapResult)
      .then((res) => {
        if (res.data.payload && res.data.payload.length >= 1) {
          dispatch(selectInterface(res.data.payload[0]));
        }
      });
  }, [dispatch, token]);
  return (
    <>
      {loadbalancer && <Loadbalancer />}
      {nodes && <Nodes />}
      {interfaces && <Interfaces />}
      {errors && <Errors />}
      {settings && <Settings />}
    </>
  );
};

export default Dashboard;
