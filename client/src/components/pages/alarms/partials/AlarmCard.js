import React from "react";
import ReactTimeAgo from "react-time-ago";

const AlarmCard = ({ alarm }) => {
  const { type, value, createdAt, node, interface: inter } = alarm;

  return (
    <div className="alarm-card">
      <h3>{type}</h3>
      <p>
        {``} at {node ? `node ${node.name}` : `interface ${inter.interface}`}
      </p>

      <span>
        <ReactTimeAgo date={createdAt} />
      </span>
    </div>
  );
};

export default AlarmCard;
