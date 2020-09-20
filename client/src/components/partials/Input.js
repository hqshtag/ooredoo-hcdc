import React from "react";

const Input = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  description,
  additionalClasses,
}) => {
  return (
    <div className="input-wrapper">
      <input
        className={`form-input ${additionalClasses}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={"off"}
      />
      <p className="input-description">{description}</p>
    </div>
  );
};

export default Input;
