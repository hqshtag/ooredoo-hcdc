import React from "react";
import { Line } from "react-chartjs-2";
import {
  formatAMPM,
  formatAMPM_justhours,
  formatDate,
  isToday,
} from "../../../../../utils";

const NodeTimeChart = ({ node, nodeData }) => {
  const { cpu } = nodeData;

  const labels = cpu.map((e, i) => {
    let t = new Date(e[1]);
    if (isToday(t)) {
      return formatAMPM(t);
    } else {
      return formatDate(t) + " " + formatAMPM_justhours(t);
    }
  });

  const points = cpu.map((e) => {
    return e[0];
  });

  const data = {
    labels: [...labels, "currently"],
    datasets: [
      {
        label: "Usage %",
        data: [...points, node.cpu],
        fill: false,
        // backgroundColor: ["#f54141"],
        borderColor: ["#18a3df"],
        borderWidth: 1.51,
      },
    ],
  };
  return (
    <div>
      <Line
        data={data}
        width={360}
        height={250}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
};

export default NodeTimeChart;
