import React, { useState } from "react";
import { useSelector } from "react-redux";
import { currentUserSelector } from "../../../../redux/slices/authSlice";
import { errorSelector } from "../../../../redux/slices/errorSlice";
import Search from "../../../partials/Search";
import ErrorCard from "./ErrorCard";

const ErrorsView = ({ remove }) => {
  const user = useSelector(currentUserSelector);

  const [filter, setFilter] = useState("");
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const errors = useSelector(errorSelector);

  const filteredErrors =
    errors && errors.length > 0
      ? errors.filter(
          (e) =>
            e.code.toString().includes(filter) ||
            e.type.toLowerCase().includes(filter.toLowerCase()) ||
            e.interface.toLowerCase().includes(filter.toLowerCase()) ||
            e.node.toLowerCase().includes(filter.toLowerCase())
        )
      : [];
  const cards =
    filteredErrors.length > 0
      ? filteredErrors.map((e, k) => {
          return (
            <ErrorCard
              error={e}
              admin={user.role === "admin"}
              remove={remove}
              key={k}
            />
          );
        })
      : null;

  return (
    <div className="errors-view">
      <Search
        value={filter}
        onChange={handleFilterChange}
        placeholder="Filter errors by Type, Code, Nodes or interfaces"
      />
      {cards || <h4>Woops no errors found</h4>}
    </div>
  );
};

export default ErrorsView;
