import React, { useEffect } from "react";
import InterfacesView from "./partials/InterfacesView";
import { useDispatch, useSelector } from "react-redux";
import {
  getAll,
  selectedInterfaceSelector,
} from "../../../redux/slices/interfaceSlice";
import { tokenSelector } from "../../../redux/slices/authSlice";
import InterfaceCharts from "./partials/InterfaceCharts";
import { getInterfaceData } from "../../../redux/slices/dataSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const Interfaces = () => {
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);
  const selected = useSelector(selectedInterfaceSelector);
  useEffect(() => {
    dispatch(getAll(token))
      .then(unwrapResult)
      .then(() => {
        dispatch(getInterfaceData(token));
      });
  }, [dispatch, token]);
  return (
    <div className="interfaces-page">
      <InterfacesView />
      {selected && <InterfaceCharts inter={selected} />}
    </div>
  );
};

export default Interfaces;
