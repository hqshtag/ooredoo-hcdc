import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { alarmSelector } from "../../../../redux/slices/alarmSlice";
import { currentUserSelector } from "../../../../redux/slices/authSlice";
import AlarmCard from "./AlarmCard";

const AlarmsView = ({ deleteAll, remove }) => {
  const alarms = useSelector(alarmSelector);
  const user = useSelector(currentUserSelector);
  const admin = user.role === "admin";

  const cards =
    alarms && alarms.length > 0
      ? alarms
          .map((a, i) => {
            return (
              <AlarmCard alarm={a} key={i} remove={remove} admin={admin} />
            );
          })
          .reverse()
      : null;
  console.log(cards);
  return (
    <div className="alarms-view">
      {cards}
      {!cards && <h4>No Alarms detected!</h4>}
    </div>
  );
};

export default AlarmsView;
