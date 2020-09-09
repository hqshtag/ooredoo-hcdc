import React from "react";

import { ReactComponent as Nodes } from "../../assets/icons/nodes.svg";
import { ReactComponent as Errors } from "../../assets/icons/errors.svg";
import { ReactComponent as Interfaces } from "../../assets/icons/interfaces.svg";
import { ReactComponent as Users } from "../../assets/icons/users.svg";
import { ReactComponent as LoadBalancer } from "../../assets/icons/loadbalancer.svg";
import { useSelector } from "react-redux";
import { currentUserSelector } from "../../redux/slices/authSlice";

const Usermenu = ({ handleMenuNavigation }) => {
  const currentUser = useSelector(currentUserSelector);
  const { username, role } = currentUser;

  let accessRights = role === "admin" ? "Super Admin" : "Admin";
  return (
    <div className="user-menu">
      <button
        className="btn user-menu-btn"
        data-key="loadbalancer"
        onClick={handleMenuNavigation}
      >
        <LoadBalancer /> F5 BIG IP
      </button>
      <button
        className="btn user-menu-btn"
        data-key="nodes"
        onClick={handleMenuNavigation}
      >
        <Nodes /> Nodes
      </button>

      <button
        className="btn user-menu-btn"
        data-key="interfaces"
        onClick={handleMenuNavigation}
      >
        <Interfaces /> Interfaces
      </button>
      <button
        className="btn user-menu-btn"
        data-key="errors"
        onClick={handleMenuNavigation}
      >
        <Errors /> Errors
      </button>
      {role === "admin" && (
        <button
          className="btn user-menu-btn"
          data-key="users"
          onClick={handleMenuNavigation}
        >
          <Users /> Users
        </button>
      )}

      <h4>Logged in as: {username}</h4>
      <h5>Access Rights: {accessRights}</h5>
    </div>
  );
};

export default Usermenu;
