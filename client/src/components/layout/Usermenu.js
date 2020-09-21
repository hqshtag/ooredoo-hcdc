import React from "react";

import { useSelector } from "react-redux";
import { alarmSelector } from "../../redux/slices/alarmSlice";
import { currentUserSelector } from "../../redux/slices/authSlice";
import { errorSelector } from "../../redux/slices/errorSlice";
import { f5Selector } from "../../redux/slices/f5Slice";
import { interfaceSelector } from "../../redux/slices/interfaceSlice";
import { nodeSelector } from "../../redux/slices/nodeSlice";
import UserMenuBtn from "../partials/UserMenuBtn";

const Usermenu = ({ menu, handleMenuNavigation }) => {
  const currentUser = useSelector(currentUserSelector);
  const { username, role } = currentUser;

  //getting number of erros, nodes,interfaces, bigips,alarms
  const errors = useSelector(errorSelector);
  const interfaces = useSelector(interfaceSelector);
  const nodes = useSelector(nodeSelector);
  const loadbalancers = useSelector(f5Selector);
  const alarms = useSelector(alarmSelector);

  let accessRights = role === "admin" ? "Super Admin" : "Admin";
  console.log(menu);
  return (
    <div className="user-menu">
      <UserMenuBtn
        dataKey="loadbalancer"
        label="F5 BIG IP"
        onClick={handleMenuNavigation}
        active={menu.loadbalancer}
        number={loadbalancers.length}
      />
      <UserMenuBtn
        dataKey="nodes"
        label="Nodes"
        onClick={handleMenuNavigation}
        active={menu.nodes}
        number={nodes.length}
      />
      <UserMenuBtn
        dataKey="interfaces"
        label="Interfaces"
        onClick={handleMenuNavigation}
        active={menu.interfaces}
        number={interfaces.length}
      />
      <UserMenuBtn
        dataKey="errors"
        label="Errors"
        onClick={handleMenuNavigation}
        active={menu.errors}
        number={errors.length}
      />
      <UserMenuBtn
        dataKey="alarms"
        label="Alarms"
        onClick={handleMenuNavigation}
        active={menu.alarms}
        number={alarms.length}
      />
      <UserMenuBtn
        dataKey="settings"
        label="Settings"
        onClick={handleMenuNavigation}
        active={menu.settings}
      />

      <h4>Logged in as: {username}</h4>
      <h5>Access Rights: {accessRights}</h5>
    </div>
  );
};

export default Usermenu;
