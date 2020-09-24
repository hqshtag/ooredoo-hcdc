import React from "react";

import UserManagement from "./partials/UserManagement";
import DataManagement from "./partials/DataManagement";
import UserSettings from "./partials/UserSettings";
import { useSelector } from "react-redux";
import { currentUserSelector } from "../../../redux/slices/authSlice";
import AlarmSettings from "./partials/AlarmSettings";

const Settings = () => {
  const currentUser = useSelector(currentUserSelector);
  const { role } = currentUser;
  const admin = role === "admin";
  return (
    <div className="settings-page">
      <div>
        <UserSettings admin={admin} />
        {admin && <DataManagement />}
        {admin && <AlarmSettings />}
      </div>

      {admin && <UserManagement />}
    </div>
  );
};

export default Settings;
