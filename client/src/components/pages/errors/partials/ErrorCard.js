import React from "react";
import { ReactComponent as Remove } from "../../../../assets/icons/close.svg";

const ErrorCard = ({ error, remove, admin = false }) => {
  const { _id, node, interface: inter, type, code } = error;
  return (
    <div className="error-card">
      <label className="error-label">
        code
        <span className="field">{code}</span>
      </label>
      <label className="error-label">
        type
        <span className="field reverse">{type}</span>
      </label>
      <label className="error-label">
        switch name
        <span className="field">{node}</span>
      </label>
      <label className="error-label">
        interface
        <span className="field">{inter}</span>
      </label>
      {admin && (
        <div>
          <button className="icon-btn reverse" onClick={() => remove(_id)}>
            <Remove />
          </button>
        </div>
      )}
    </div>
  );
};

export default ErrorCard;
