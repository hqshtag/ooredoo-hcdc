import React from "react";
import { ReactComponent as Nodes } from "../../assets/icons/nodes.svg";
import { ReactComponent as Errors } from "../../assets/icons/errors.svg";
import { ReactComponent as Interfaces } from "../../assets/icons/interfaces.svg";
import { ReactComponent as Settings } from "../../assets/icons/edit.svg";
import { ReactComponent as LoadBalancer } from "../../assets/icons/loadbalancer.svg";
import { ReactComponent as Alarms } from "../../assets/icons/alarm.svg";

const UserMenuBtn = ({
  label,
  active = false,
  dataKey,
  onClick,
  number = -1,
}) => {
  return (
    <button
      className={`user-menu-btn ${active && "active"}`}
      data-key={dataKey}
      onClick={onClick}
    >
      {dataKey === "loadbalancer" && <LoadBalancer />}
      {dataKey === "nodes" && <Nodes />}
      {dataKey === "errors" && <Errors />}
      {dataKey === "interfaces" && <Interfaces />}
      {dataKey === "settings" && <Settings />}
      {dataKey === "alarms" && <Alarms />}
      {label}
      {number > 0 && <span className="number">{number}</span>}
    </button>
  );
};

export default UserMenuBtn;
