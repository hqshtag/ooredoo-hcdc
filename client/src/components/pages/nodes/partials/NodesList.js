import React from "react";
import NodeCard from "./NodeCard";

const NodesList = ({ nodes, admin, handleRemove, handleUpdate }) => {
  return (
    <>
      {nodes && nodes.length > 0 ? (
        nodes.map((n, i) => {
          return (
            <NodeCard
              node={n}
              key={i}
              admin={admin}
              handleRemove={handleRemove}
              handleUpdate={handleUpdate}
            />
          );
        })
      ) : (
        <h4>Woops no results found</h4>
      )}
    </>
  );
};

export default NodesList;
