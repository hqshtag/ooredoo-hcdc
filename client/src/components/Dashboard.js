import React, { useEffect } from "react";
import Nodes from "./pages/nodes/Nodes";
import Interfaces from "./pages/interfaces/Interfaces";
import Errors from "./pages/errors/Errors";
import Settings from "./pages/settings/Settings";
import Alarms from "./pages/alarms/Alarms";

import { useDispatch } from "react-redux";

import { getAll as getAllErrors } from "../redux/slices/errorSlice";
import { getAll as getAllUsers } from "../redux/slices/usersSlice";
import { getAll as getAllF5 } from "../redux/slices/f5Slice";
import { getAll as getAllNodes } from "../redux/slices/nodeSlice";
import { getAll as getAllAlarms } from "../redux/slices/alarmSlice";

import {
  getAll as getAllInterfaces,
  select as selectInterface,
} from "../redux/slices/interfaceSlice";
import Loadbalancer from "./pages/loadbalancer/Loadbalancer";
import { unwrapResult } from "@reduxjs/toolkit";
import { clearErrors as clearAuthErrors } from "../redux/slices/authSlice";
import { createSuccess } from "../redux/slices/alertSlice";
import { getInterfaceData, getNodesData } from "../redux/slices/dataSlice";
import { getSettings } from "../redux/slices/settingsSlice";

const Dashboard = ({ activeMenu, token }) => {
  const {
    nodes,
    interfaces,
    errors,
    loadbalancer,
    alarms,
    settings,
  } = activeMenu;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearAuthErrors());
    dispatch(createSuccess("Logged in"));
    dispatch(getNodesData(token));
    dispatch(getInterfaceData(token));
    dispatch(getAllUsers(token));
    dispatch(getAllF5(token));
    dispatch(getAllNodes(token));
    dispatch(getAllErrors(token));
    dispatch(getAllAlarms(token));
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
      {alarms && <Alarms />}
      {settings && <Settings />}
    </>
  );
};

export default Dashboard;
