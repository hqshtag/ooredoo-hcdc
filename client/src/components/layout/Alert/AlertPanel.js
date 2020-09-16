import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  alertsSelector,
  hideAlert,
  updateList,
} from "../../../redux/slices/alertSlice";
import Card from "./Card";

const AlertPanel = () => {
  const dispatch = useDispatch();
  const alerts = useSelector(alertsSelector);
  const [shouldClear, setShouldClear] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => {
      if (shouldClear) {
        dispatch(updateList());
        setShouldClear(false);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [alerts, shouldClear, dispatch]);

  const closeAlert = (key) => {
    dispatch(hideAlert(key));
    setShouldClear(true);
  };

  const cards =
    alerts && alerts.length > 0
      ? alerts.map((a, key) => {
          return (
            <Card
              key={key}
              index={key}
              type={a.type}
              close={closeAlert}
              show={a.show}
              message={a.message}
            />
          );
        })
      : [];

  return <>{cards}</>;
};

export default AlertPanel;
