import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tokenSelector } from "../../../redux/slices/authSlice";
import { getAll } from "../../../redux/slices/f5Slice";
import LoadbalancerView from "./partials/LoadbalancerView";

const Loadbalancer = () => {
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);

  useEffect(() => {
    dispatch(getAll(token));
  }, [token, dispatch]);

  return (
    <div className="f5-page">
      <LoadbalancerView />
    </div>
  );
};

export default Loadbalancer;
