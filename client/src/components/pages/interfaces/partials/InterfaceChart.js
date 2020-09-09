import React from "react";
import { Bar } from "react-chartjs-2";

const InterfaceChart = ({ inter }) => {
  const { Rx, Tx, BW } = inter;
  console.log(inter);
  const data = {
    labels: ["Rx", "Tx", "BW"],
    datasets: [
      {
        label: "Bytes",
        data: [parseInt(Rx), parseInt(Tx), parseInt(BW)],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart">
      <Bar data={data} height={420} width={420} />
    </div>
  );
};

export default InterfaceChart;
