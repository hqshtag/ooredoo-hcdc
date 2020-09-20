import React from "react";

import { useSelector } from "react-redux";
import { currentUserSelector } from "../../redux/slices/authSlice";
import UserMenuBtn from "../partials/UserMenuBtn";

const Usermenu = ({ menu, handleMenuNavigation }) => {
  const currentUser = useSelector(currentUserSelector);
  const { username, role } = currentUser;

  let accessRights = role === "admin" ? "Super Admin" : "Admin";
  console.log(menu);
  return (
    <div className="user-menu">
      <UserMenuBtn
        dataKey="loadbalancer"
        label="F5 BIG IP"
        onClick={handleMenuNavigation}
        active={menu.loadbalancer}
      />
      <UserMenuBtn
        dataKey="nodes"
        label="Nodes"
        onClick={handleMenuNavigation}
        active={menu.nodes}
      />
      <UserMenuBtn
        dataKey="interfaces"
        label="Interfaces"
        onClick={handleMenuNavigation}
        active={menu.interfaces}
      />
      <UserMenuBtn
        dataKey="errors"
        label="Errors"
        onClick={handleMenuNavigation}
        active={menu.errors}
      />
      <UserMenuBtn
        dataKey="alarms"
        label="Alarms"
        onClick={handleMenuNavigation}
        active={menu.alarms}
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
