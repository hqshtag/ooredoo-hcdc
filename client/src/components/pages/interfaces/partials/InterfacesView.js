import React, { useState } from "react";
import Search from "../../../partials/Search";
import { interfaceSelector } from "../../../../redux/slices/interfaceSlice";
import InterfaceCard from "./InterfaceCard";
import { useSelector } from "react-redux";

const InterfacesView = () => {
  const [filter, setFilter] = useState("");
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const interfaces = useSelector(interfaceSelector);
  let filteredInterfaces =
    interfaces && interfaces.length > 0
      ? interfaces.filter(
          (i) =>
            i["Switch Name"].toLowerCase().includes(filter.toLowerCase()) ||
            i.ip.toLowerCase().includes(filter.toLowerCase()) ||
            i.interface.toLowerCase().includes(filter.toLowerCase())
        )
      : [];
  //console.log(filteredInterfaces);
  const cards =
    filteredInterfaces.length > 0
      ? filteredInterfaces.map((i, k) => {
          return <InterfaceCard data={i} key={k} />;
        })
      : null;
  return (
    <div className="interfaces-view">
      <Search value={filter} onChange={handleFilterChange} />
      {cards}
    </div>
  );
};

export default InterfacesView;
