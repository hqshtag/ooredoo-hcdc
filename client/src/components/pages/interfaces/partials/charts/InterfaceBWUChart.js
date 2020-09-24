import React from "react";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";

const InterfaceBWUChart = ({ usage }) => {
  const ol = useSelector((state) => state.settings.ol);

  const data = {
    labels: ["BW-Utilisation", "Free"],
    datasets: [
      {
        label: "percent",
        data: [usage, 100 - usage],
        backgroundColor: [`${usage >= ol ? "#f54141" : "#41d67f"}`, "#515151"],
        borderColor: ["#ccc", "#ededed"],
        borderWidth: 0.51,
      },
    ],
  };
  return (
    <div>
      <Doughnut
        data={data}
        width={120}
        height={120}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
};

export default InterfaceBWUChart;
