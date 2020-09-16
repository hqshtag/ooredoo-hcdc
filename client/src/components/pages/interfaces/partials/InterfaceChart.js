import React from "react";
import { HorizontalBar } from "react-chartjs-2";

const InterfaceChart = ({ inter }) => {
  const {
    interface: interfaceName,
    Rx,
    Tx,
    BW,
    input_size,
    output_size,
  } = inter;
  //console.log(inter);
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

  const data2 = {
    labels: ["Output", "Input"],
    datasets: [
      {
        label: "Bits",
        data: [parseInt(output_size), parseInt(input_size)],
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
    <div className="chart-container">
      <h3>{interfaceName}</h3>
      <HorizontalBar data={data} height={210} width={333} />
      <HorizontalBar data={data2} height={210} width={333} />
    </div>
  );
};

export default InterfaceChart;
