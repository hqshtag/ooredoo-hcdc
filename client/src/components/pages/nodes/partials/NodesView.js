import React, { useState } from "react";
import { useSelector } from "react-redux";
import { currentUserSelector } from "../../../../redux/slices/authSlice";
import { nodeSelector } from "../../../../redux/slices/nodeSlice";
import Search from "../../../partials/Search";
import NodesList from "./NodesList";

const NodesView = ({ handleRemove, handleUpdate }) => {
  const [filter, setFilter] = useState("");
  const user = useSelector(currentUserSelector);
  const nodes = useSelector(nodeSelector);
  const admin = user.role === "admin";
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  let filteredNodes =
    nodes && nodes.length > 0
      ? nodes
          .filter(
            (n) =>
              n.name.toLowerCase().includes(filter.toLowerCase()) ||
              n.ip.toLowerCase().includes(filter.toLowerCase()) ||
              n.serial.toLowerCase().includes(filter.toLowerCase())
          )
          .reverse()
      : [];

  return (
    <div className="nodes-view">
      <Search
        value={filter}
        onChange={handleFilterChange}
        placeholder={"Search by Name, IP,  or Serial"}
      />
      <NodesList
        nodes={filteredNodes}
        admin={admin}
        handleRemove={handleRemove}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default NodesView;
