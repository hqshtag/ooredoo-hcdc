import React from "react";

const Search = ({ value, onChange, placeholder }) => {
  return (
    <input
      className="search-field"
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Search;
