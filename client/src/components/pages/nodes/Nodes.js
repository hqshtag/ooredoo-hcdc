import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAll, remove, update } from "../../../redux/slices/nodeSlice";
import { tokenSelector } from "../../../redux/slices/authSlice";
import NodesView from "./partials/NodesView";
import { unwrapResult } from "@reduxjs/toolkit";
import { createInfo, createWarning } from "../../../redux/slices/alertSlice";
import { getNodesData } from "../../../redux/slices/dataSlice";

const Nodes = () => {
  const dispatch = useDispatch();

  const token = useSelector(tokenSelector);

  const handleRemove = (id) => {
    dispatch(remove({ id, token }))
      .then(unwrapResult)
      .then(() => {
        dispatch(createWarning("Node deleted!"));
        dispatch(getAll(token));
      });
  };

  const handleUpdate = (id, data) => {
    dispatch(update({ data, id, token }))
      .then(unwrapResult)
      .then(() => {
        dispatch(createInfo("Node Updated!"));
        dispatch(getAll(token));
      });
  };

  useEffect(() => {
    dispatch(getAll(token))
      .then(unwrapResult)
      .then(() => {
        dispatch(getNodesData(token));
      });
  }, [dispatch, token]);

  return (
    <div className="nodes-page">
      <NodesView handleRemove={handleRemove} handleUpdate={handleUpdate} />
    </div>
  );
};

export default Nodes;
