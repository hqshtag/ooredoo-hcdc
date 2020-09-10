import React from "react";

const F5Card = ({ f5 }) => {
  const {
    hostname,
    IP,
    "Virtuel Server": VS,
    VS_Availability,
    Destination,
    Pool,
    Member1,
    Member2,
    Mbr1_Availability,
    Mbr2_Availability,
    Node1_Availability,
    Node2_Availability,
  } = f5;

  return (
    <div className="f5-card">
      <h4>{hostname}</h4>
      <div className="ips">
        <span className="ip">{IP}</span>
        <span className="ip">{Destination}</span>
      </div>
      <div className="serv">
        <span className="data">Pool: {Pool}</span>
        <span className="data">
          VS: {VS} <Circle condition={VS_Availability === "available"} />
        </span>
      </div>
      <div className="members">
        <label>
          Members:
          <span className="member-data">
            {Member1} <Circle condition={Mbr1_Availability === "available"} />
          </span>
          <span className="member-data">
            {Member2} <Circle condition={Mbr2_Availability === "available"} />
          </span>
        </label>
        <label>
          Nodes:
          <span className="node-data">
            N#1: <Circle condition={Node1_Availability === "available"} />
          </span>
          <span className="node-data">
            N#2: <Circle condition={Node2_Availability === "available"} />
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
