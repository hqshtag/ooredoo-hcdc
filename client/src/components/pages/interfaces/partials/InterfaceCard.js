import React from "react";
import { ReactComponent as UP } from "../../../../assets/icons/up-arrow.svg";
import { ReactComponent as DOWN } from "../../../../assets/icons/down-arrow.svg";
import { useDispatch } from "react-redux";
import { select } from "../../../../redux/slices/interfaceSlice";
//import InterfaceChart from "./InterfaceChart";

const InterfaceCard = ({ data }) => {
  const {
    node,
    interface: interfaceName,
    ip,
    state,
    /* Rx,
    Tx,
    BW,
    Input_taille,
    Output_taille, */
  } = data;

  const dispatch = useDispatch();
  return (
    <div className="interface-card" onClick={() => dispatch(select(data))}>
      <div className="names">
        <h2>{interfaceName}</h2>
        <h3>
          <span>Node:</span> {node}
        </h3>
      </div>
      <div id="IP">
        <h3>{ip}</h3>
      </div>
      {/*  <table>
        <thead>
          <tr>
            <th>Rx</th>
            <th>Tx</th>
            <th>BW</th>
            <th>Input size</th>
            <th>Ouput size</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{Rx}</td>
            <td>{Tx}</td>
            <td>{BW}</td>
            <td>{Input_taille}</td>
            <td>{Output_taille}</td>
          </tr>
        </tbody>
      </table> */}

      {state === "up" ? <UP /> : <DOWN />}
    </div>
  );
};

export default InterfaceCard;
