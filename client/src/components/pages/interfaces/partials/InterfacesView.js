import React, { useState } from "react";
import Search from "../../../partials/Search";
import { interfaceSelector } from "../../../../redux/slices/interfaceSlice";
import InterfaceCard from "./InterfaceCard";
import { useSelector } from "react-redux";
import { nodeUniqueNamesSelector } from "../../../../redux/slices/nodeSlice";

const InterfacesView = () => {
  const [filter, setFilter] = useState("");
  const [nodeOption, setNodeOption] = useState("all");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const nodeNames = useSelector(nodeUniqueNamesSelector);
  const hanldeOptionChange = (e) => {
    setNodeOption(e.target.value);
  };
  const interfaces = useSelector(interfaceSelector);
  let filteredInterfaces =
    interfaces && interfaces.length > 0
      ? nodeOption === "all"
        ? interfaces.filter(
            (i) =>
              i.node.toLowerCase().includes(filter.toLowerCase()) ||
              i.ip.toLowerCase().includes(filter.toLowerCase()) ||
              i.interface.toLowerCase().includes(filter.toLowerCase())
          )
        : interfaces.filter(
            (i) =>
              i.node.includes(nodeOption) &&
              (i.ip.toLowerCase().includes(filter.toLowerCase()) ||
                i.interface.toLowerCase().includes(filter.toLowerCase()))
          )
      : [];

  const cards =
    filteredInterfaces.length > 0
      ? filteredInterfaces.map((i, k) => {
          return <InterfaceCard data={i} key={k} />;
        })
      : null;
  return (
    <div className="interfaces-view">
      <div>
        <Search
          value={filter}
          onChange={handleFilterChange}
          placeholder={"Search by Node Name, Interface Name or IP"}
        />
        <select value={nodeOption} onChange={hanldeOptionChange}>
          <option value="all" key="-1">
            --All Nodes--
          </option>
          {nodeNames.map((e, k) => {
            return (
              <option value={e} key={k}>
                {e}
              </option>
            );
          })}
        </select>
      </div>

      {cards || <h4>Woops no interfaces found</h4>}
    </div>
  );
};

export default InterfacesView;
