import React from "react";
import { useSelector } from "react-redux";
import { nodesDataSelector } from "../../../../redux/slices/dataSlice";
import NodeCPUChart from "./charts/NodeCPUChart";
import NodeTimeChart from "./charts/NodeTimeChart";

const NodeCharts = ({ node }) => {
  const nodesData = useSelector(nodesDataSelector);
  const check = nodesData && nodesData.length > 0;

  const thisNodeData = check
    ? nodesData.find((e) => e.node === node._id)
    : null;
  //console.log(thisNodeData);
  return (
    <div className="charts">
      <NodeCPUChart cpu={node.cpu} />
      {thisNodeData && <NodeTimeChart node={node} nodeData={thisNodeData} />}
    </div>
  );
};

export default NodeCharts;
