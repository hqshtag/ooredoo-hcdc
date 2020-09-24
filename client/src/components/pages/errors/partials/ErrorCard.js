import React from "react";
import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";
import { ReactComponent as Remove } from "../../../../assets/icons/close.svg";

const ErrorCard = ({ error, remove, admin = false }) => {
  console.log(error);
  const {
    _id,
    node,
    interface: inter,
    type,
    code,
    sys_date,
    createdAt,
  } = error;
  return (
    <div className="error-card">
      <label className="error-label">
        switch name
        <span className="field">{node}</span>
      </label>
      <label className="error-label">
        interface
        <span className="field">{inter}</span>
      </label>

      <label className="error-label">
        types
        <div>
          {type.map((t) => {
            return <span className="field reverse">{t}</span>;
          })}
        </div>
      </label>
      <label className="error-label">
        updated
        <span className="field">
          <ReactTimeAgo date={createdAt} />
        </span>
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
