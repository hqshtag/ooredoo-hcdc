import React, { useEffect } from "react";
import InterfacesView from "./partials/InterfacesView";
import { useDispatch, useSelector } from "react-redux";
import {
  getAll,
  selectedInterfaceSelector,
} from "../../../redux/slices/interfaceSlice";
import { tokenSelector } from "../../../redux/slices/authSlice";
import InterfaceChart from "./partials/InterfaceChart";

const Interfaces = () => {
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);
  const selected = useSelector(selectedInterfaceSelector);

  useEffect(() => {
    dispatch(getAll(token));
  }, [dispatch, token]);

  return (
    <div className="interfaces-page">
      <InterfacesView />
      {selected && <InterfaceChart inter={selected} />}
    </div>
  );
};

export default Interfaces;
