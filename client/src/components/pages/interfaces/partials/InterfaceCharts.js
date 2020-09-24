import React from "react";

import { useSelector } from "react-redux";
import { interfacesDataSelector } from "../../../../redux/slices/dataSlice";
import InterfaceBWUChart from "./charts/InterfaceBWUChart";
import InterfaceTimeChart from "./charts/InterfaceTimeChart";
import InterfaceValuesChart from "./charts/InterfaceValuesChart";

const InterfaceCharts = ({ inter }) => {
  const interfaceData = useSelector(interfacesDataSelector);
  const check = interfaceData && interfaceData.length > 0;
  const thisInterfaceData = check
    ? interfaceData.find((e) => e.interface === inter._id)
    : null;
  return (
    <div className="chart-container">
      <div style={{ display: "flex", margin: "20px" }}>
        <InterfaceBWUChart usage={inter.usage} />

        <InterfaceValuesChart inter={inter} />
      </div>
      {thisInterfaceData && (
        <InterfaceTimeChart inter={inter} interfaceData={thisInterfaceData} />
      )}
    </div>
  );
};

export default InterfaceCharts;
