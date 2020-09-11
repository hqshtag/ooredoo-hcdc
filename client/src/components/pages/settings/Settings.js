import React from "react";
import AddUser from "../users/forms/AddUser";
import ViewUsers from "../users/partials/ViewUsers";
import { useSelector, useDispatch } from "react-redux";
import {
  getAll as getAllUsers,
  removeUser,
} from "../../../redux/slices/usersSlice";
import { tokenSelector } from "../../../redux/slices/authSlice";
import ExcelReader from "./excelReader/ExcelReader";
import {
  createMany as createManyNodes,
  deleteAll as deleteAllNodes,
} from "../../../redux/slices/nodeSlice";
import {
  createMany as createManyF5s,
  deleteAll as deleteAllF5s,
} from "../../../redux/slices/f5Slice";
import {
  createMany as createManyInterfaces,
  deleteAll as deleteAllInterfaces,
} from "../../../redux/slices/interfaceSlice";

const Settings = () => {
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);
  const handleRemoveUser = (id) => {
    dispatch(removeUser({ id, token })).then(() => {
      dispatch(getAllUsers(token));
    });
  };

  return (
    <div className="settings-page">
      <div className="data-management">
        <h3>Data Management</h3>

        <div className="imports">
          <ExcelReader
            label={"Nodes"}
            id={"node-xlsx"}
            createMany={createManyNodes}
            deleteAll={deleteAllNodes}
          />
          <ExcelReader
            label={"Interfaces"}
            id={"interface-xlsx"}
            createMany={createManyInterfaces}
            deleteAll={deleteAllInterfaces}
          />
          <ExcelReader
            label={"F5-BIG IP"}
            id={"F5-xlsx"}
            createMany={createManyF5s}
            deleteAll={deleteAllF5s}
          />
        </div>
      </div>
      <div className="users-management">
        <h3>Users Management</h3>
        <AddUser />
        <ViewUsers handleRemove={handleRemoveUser} />
      </div>
    </div>
  );
};

export default Settings;
