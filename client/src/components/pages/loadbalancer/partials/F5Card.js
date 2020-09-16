import React from "react";

const F5Card = ({ f5 }) => {
  const {
    hostname,
    ip,
    virtual_server,
    vs_availability,
    destination,
    pool,
    member1,
    member2,
    mbr1_availability,
    mbr2_availability,
    node1_availability,
    node2_availability,
  } = f5;

  return (
    <div className="f5-card">
      <h4>{hostname}</h4>
      <div className="ips">
        <span className="ip">{ip}</span>
        <span className="ip">{destination}</span>
      </div>
      <div className="serv">
        <span className="data">Pool: {pool}</span>
        <span className="data">
          VS: {virtual_server}{" "}
          <Circle condition={vs_availability === "available"} />
        </span>
      </div>
      <div className="members">
        <label>
          Members:
          <span className="member-data">
            {member1} <Circle condition={mbr1_availability === "available"} />
          </span>
          <span className="member-data">
            {member2} <Circle condition={mbr2_availability === "available"} />
          </span>
        </label>
        <label>
          Nodes:
          <span className="node-data">
            N#1: <Circle condition={node1_availability === "available"} />
          </span>
          <span className="node-data">
            N#2: <Circle condition={node2_availability === "available"} />
          </span>
        </label>
      </div>
    </div>
  );
};

const Circle = ({ condition = false }) => {
  return <div className={condition ? "circle green" : "circle red"}></div>;
};

export default F5Card;
