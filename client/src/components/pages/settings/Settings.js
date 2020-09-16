import React from "react";

import UserManagement from "./partials/UserManagement";
import DataManagement from "./partials/DataManagement";
import UserSettings from "./partials/UserSettings";
import { useSelector } from "react-redux";
import { currentUserSelector } from "../../../redux/slices/authSlice";

const Settings = () => {
  const currentUser = useSelector(currentUserSelector);
  const { role } = currentUser;
  const admin = role === "admin";
  return (
    <div className="settings-page">
      <div>
        {admin && <DataManagement />}
        <UserSettings />
      </div>

      {admin && <UserManagement />}
    </div>
  );
};

export default Settings;
