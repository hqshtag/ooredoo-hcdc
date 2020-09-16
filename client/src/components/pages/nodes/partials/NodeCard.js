import React, { useState, useEffect } from "react";
import { ReactComponent as Remove } from "../../../../assets/icons/close.svg";
import { ReactComponent as Edit } from "../../../../assets/icons/edit.svg";
import { ReactComponent as Check } from "../../../../assets/icons/check.svg";

const NodeCard = ({ node, handleRemove, handleUpdate, admin = false }) => {
  const [manage, setManage] = useState(false);
  const [fields, setFields] = useState({
    name: "",
    ip: "",
    type: "",
    version: "",
    serial: "",
  });

  useEffect(() => {
    setFields({
      name: node.name,
      ip: node.ip,
      type: node.type,
      version: node.version,
      serial: node.serial,
    });
  }, [node]);

  const handleChange = (e) => {
    e.persist();
    setFields((p) => {
      return { ...p, [e.target.name]: e.target.value };
    });
    //console.log(fields);
  };

  const toggleManage = () => {
    setManage((p) => !p);
  };
  return (
    <div className="node-card">
      <Field
        label="Node name"
        className="name-field reverse"
        name="name"
        value={fields.name}
        manage={manage}
        onChange={handleChange}
      />
      <Field
        label="IP"
        name="ip"
        className="ip-field"
        value={fields.ip}
        manage={manage}
        onChange={handleChange}
      />
      <Field
        label="Type"
        name="type"
        className="type-field reverse"
        value={fields.type}
        manage={manage}
        onChange={handleChange}
      />
      <Field
        label="Version"
        name="version"
        className="version-field"
        value={fields.version}
        manage={manage}
        onChange={handleChange}
      />
      <Field
        label="Serial Number"
        name="Serial-nbr"
        className="serial-field reverse"
        value={fields.serial}
        manage={manage}
        onChange={handleChange}
      />
      {admin && (
        <div className="buttons">
          <button
            className={manage ? " icon-btn green" : "icon-btn blue"}
            onClick={
              manage
                ? () => {
                    handleUpdate(node._id, fields);
                    toggleManage();
                  }
                : toggleManage
            }
          >
            {manage ? <Check /> : <Edit />}
          </button>
          {manage ? (
            <button
              className="icon-btn reverse"
              onClick={() => {
                // console.log(node);
                handleRemove(node._id);
                toggleManage();
              }}
            >
              <Remove />
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
};

const Field = ({ className, label, name, manage, value, onChange }) => {
  return (
    <>
      <label className="node-label">
        {" "}
        {label}
        {manage ? (
          <input
            type="text"
            className={className}
            name={name}
            value={value}
            onChange={onChange}
            autoComplete="off"
          />
        ) : (
          <span className={className}>{value}</span>
        )}{" "}
      </label>
    </>
  );
};

export default NodeCard;
