import React from "react";
import { HorizontalBar } from "react-chartjs-2";

const InterfaceValuesChart = ({ inter }) => {
  const { input_size, output_size } = inter;

  const data = {
    labels: ["Output", "Input"],
    datasets: [
      {
        label: "Bits",
        data: [parseInt(output_size), parseInt(input_size)],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <HorizontalBar data={data} width={360} height={150} />
    </div>
  );
};

export default InterfaceValuesChart;
