import React from "react";
import { Line } from "react-chartjs-2";
import {
  formatAMPM,
  formatAMPM_justhours,
  formatDate,
  isToday,
} from "../../../../../utils";

const InterfaceTimeChart = ({ inter, interfaceData }) => {
  const { input_size, output_size } = inter;
  const { bw } = interfaceData;
  const labels = bw.map((e, i) => {
    //e [[input,output], timestamp]
    let t = new Date(e[1]);
    if (isToday(t)) {
      return formatAMPM(t);
    } else {
      return formatDate(t) + " " + formatAMPM_justhours(t);
    }
  });
  const points = bw.map((e) => {
    return { x: e[0][0], y: e[0][1] };
  });

  //let bandwidthDAta = Array(points.length).fill(BW * 8);
  const data = {
    labels: [...labels, "currently"],
    datasets: [
      /* {
        lineTension: 0.1,

        label: "Bandwidth",
        fill: false,
        data: bandwidthDAta,
        backgroundColor: ["rgba(255, 68, 68,0.3)"],
        borderColor: ["rgb(255, 68, 68)"],
        borderWidth: 3,
      }, */
      {
        lineTension: 0.3,

        label: "Input",
        fill: false,
        data: [...points.map((e) => e.x), input_size],
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 3,
      },
      {
        lineTension: 0.3,

        label: "Output",
        fill: false,

        data: [...points.map((e) => e.y), output_size],
        backgroundColor: ["rgba(255, 206, 86, 0.5)"],
        borderColor: ["rgba(255, 206, 86, 1)"],
        borderWidth: 3,
      },
    ],
  };

  return (
    <div>
      <Line data={data} height={300} width={420} />{" "}
    </div>
  );
};

export default InterfaceTimeChart;
