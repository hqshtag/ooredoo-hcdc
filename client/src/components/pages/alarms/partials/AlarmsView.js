import React from "react";
import { useSelector } from "react-redux";
import { alarmSelector } from "../../../../redux/slices/alarmSlice";
import AlarmCard from "./AlarmCard";

const AlarmsView = ({ deleteAll }) => {
  const alarms = useSelector(alarmSelector);
  const cards =
    alarms && alarms.length > 0
      ? alarms.map((a, i) => {
          return <AlarmCard alarm={a} key={i} />;
        })
      : null;
  return <div className="alarms-view">{cards}</div>;
};

export default AlarmsView;
