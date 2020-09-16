import React, { useState } from "react";
import Search from "../../../partials/Search";
import { useSelector } from "react-redux";
import { f5Selector } from "../../../../redux/slices/f5Slice";
import F5Card from "./F5Card";

const LoadbalancerView = () => {
  const [filter, setFilter] = useState("");
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const loadbalancers = useSelector(f5Selector);
  let filteredF5s =
    loadbalancers && loadbalancers.length > 0
      ? loadbalancers.filter(
          (f5) =>
            f5.hostname.toLowerCase().includes(filter.toLowerCase()) ||
            f5.virtual_server.toLowerCase().includes(filter.toLowerCase()) ||
            f5.pool.toLowerCase().includes(filter.toLowerCase()) ||
            f5.member1.toLowerCase().includes(filter.toLowerCase()) ||
            f5.member2.toLowerCase().includes(filter.toLowerCase()) ||
            f5.ip.includes(filter) ||
            f5.destination.includes(filter)
        )
      : [];
  //console.log(filteredF5s);
  const cards =
    filteredF5s.length > 0
      ? filteredF5s.map((f5, key) => {
          return <F5Card f5={f5} key={key} />;
        })
      : null;
  return (
    <div className="f5-view">
      <Search
        value={filter}
        onChange={handleFilterChange}
        placeholder={"Search by Name, Ips, Members ..."}
      />
      <div className="cards-container">{cards}</div>
      {!cards && <h4>Woops no F5 loadbalancers found</h4>}
    </div>
  );
};

export default LoadbalancerView;
