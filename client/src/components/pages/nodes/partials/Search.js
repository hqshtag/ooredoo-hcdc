import React from "react";

const Search = ({ value, onChange }) => {
  return (
    <input
      className="search-field"
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search by Name, IP,  or Serial"
    />
  );
};

export default Search;
