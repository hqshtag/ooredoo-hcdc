import React from "react";
import { HorizontalBar, Line, Bar, Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";

const NodeCPUChart = ({ cpu }) => {
  const oc = useSelector((state) => state.settings.oc);
  //console.log(OL);
  const data = {
    labels: ["CPU-Usage", "Free"],
    datasets: [
      {
        label: "percent",
        data: [cpu, 100 - cpu],
        backgroundColor: [`${cpu >= oc ? "#f54141" : "#41d67f"}`, "#515151"],
        borderColor: ["#ccc", "#ededed"],
        borderWidth: 0.51,
      },
    ],
  };
  return (
    <div>
      <Doughnut
        data={data}
        width={200}
        height={250}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
};

export default NodeCPUChart;
