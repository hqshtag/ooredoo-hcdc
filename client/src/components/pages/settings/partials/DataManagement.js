import React from "react";
import ExcelReader from "../excelReader/ExcelReader";
import {
  createMany as createManyNodes,
  deleteAll as deleteAllNodes,
  getAll as getAllNodes,
} from "../../../../redux/slices/nodeSlice";
import {
  createMany as createManyF5s,
  deleteAll as deleteAllF5s,
  getAll as getAllF5,
} from "../../../../redux/slices/f5Slice";
import {
  createMany as createManyInterfaces,
  deleteAll as deleteAllInterfaces,
  getAll as getAllInterfaces,
} from "../../../../redux/slices/interfaceSlice";

import {
  createMany as createManyErrors,
  deleteAll as deleteAllErrors,
  getAll as getAllErrors,
} from "../../../../redux/slices/errorSlice";

const DataManagement = () => {
  return (
    <div className="data-management">
      <h3>Data Management</h3>

      <div className="imports">
        <ExcelReader
          label={"Nodes"}
          id={"node-xlsx"}
          type="node"
          createMany={createManyNodes}
          deleteAll={deleteAllNodes}
          getAll={getAllNodes}
        />
        <ExcelReader
          label={"Interfaces"}
          id={"interface-xlsx"}
          type="interface"
          createMany={createManyInterfaces}
          deleteAll={deleteAllInterfaces}
          getAll={getAllInterfaces}
        />
        <ExcelReader
          label={"F5-BIG IP"}
          id={"F5-xlsx"}
          type="f5"
          createMany={createManyF5s}
          deleteAll={deleteAllF5s}
          getAll={getAllF5}
        />

        <ExcelReader
          label={"Errors"}
          id={"error-xlsx"}
          type="error"
          getAll={getAllErrors}
          createMany={createManyErrors}
          deleteAll={deleteAllErrors}
        />
      </div>
    </div>
  );
};

export default DataManagement;
