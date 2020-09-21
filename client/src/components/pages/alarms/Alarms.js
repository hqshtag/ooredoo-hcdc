import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAll, getAll, remove } from "../../../redux/slices/alarmSlice";
import { createWarning } from "../../../redux/slices/alertSlice";
import { tokenSelector } from "../../../redux/slices/authSlice";
import AlarmsView from "./partials/AlarmsView";

const Alarms = () => {
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);

  useEffect(() => {
    dispatch(getAll(token));
  }, [dispatch, token]);

  const handleClearAlarms = () => {
    dispatch(deleteAll(token))
      .then(unwrapResult)
      .then(() => {
        dispatch(createWarning("Cleared all Alarms"));
        dispatch(getAll(token));
      });
  };

  const handleRemove = (id) => {
    dispatch(remove({ id, token }))
      .then(unwrapResult)
      .then(() => {
        dispatch(createWarning("Alarm deleted"));
        dispatch(getAll(token));
      });
  };

  return (
    <div className="alarms-page">
      <AlarmsView deleteAll={handleClearAlarms} remove={handleRemove} />
    </div>
  );
};

export default Alarms;
