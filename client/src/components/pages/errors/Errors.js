import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createWarning } from "../../../redux/slices/alertSlice";
import { tokenSelector } from "../../../redux/slices/authSlice";
import { getAll, remove } from "../../../redux/slices/errorSlice";
import ErrorsView from "./partials/ErrorsView";

const Errors = () => {
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);

  useEffect(() => {
    dispatch(getAll(token));
  }, [dispatch, token]);

  const handleRemove = (id) => {
    dispatch(remove({ id, token }))
      .then(unwrapResult)
      .then(() => {
        dispatch(createWarning("Error deleted"));
        dispatch(getAll(token));
      });
  };
  return (
    <div className="errors-page">
      <ErrorsView remove={handleRemove} />
    </div>
  );
};

export default Errors;
