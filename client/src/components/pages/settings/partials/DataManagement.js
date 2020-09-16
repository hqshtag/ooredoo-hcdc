import React from "react";
import ExcelReader from "../excelReader/ExcelReader";
import {
  createMany as createManyNodes,
  deleteAll as deleteAllNodes,
} from "../../../../redux/slices/nodeSlice";
import {
  createMany as createManyF5s,
  deleteAll as deleteAllF5s,
} from "../../../../redux/slices/f5Slice";
import {
  createMany as createManyInterfaces,
  deleteAll as deleteAllInterfaces,
} from "../../../../redux/slices/interfaceSlice";
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
        />
        <ExcelReader
          label={"Interfaces"}
          id={"interface-xlsx"}
          type="interface"
          createMany={createManyInterfaces}
          deleteAll={deleteAllInterfaces}
        />
        <ExcelReader
          label={"F5-BIG IP"}
          id={"F5-xlsx"}
          type="f5"
          createMany={createManyF5s}
          deleteAll={deleteAllF5s}
        />
      </div>
    </div>
  );
};

export default DataManagement;
