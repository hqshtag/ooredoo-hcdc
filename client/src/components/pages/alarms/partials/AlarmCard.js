import React, { useState } from "react";
import ReactTimeAgo from "react-time-ago";
import { ReactComponent as Remove } from "../../../../assets/icons/close.svg";

const AlarmCard = ({ alarm, admin, remove }) => {
  const [hover, setHover] = useState(false);
  const { type, value, createdAt, node, interface: inter } = alarm;

  const toggleHover = () => {
    setHover(true);
    setTimeout(() => {
      setHover(false);
    }, 2000);
  };
  const info =
    node || inter
      ? node && (
          <p>
            cpu usage reached <em>{value}%</em> at <span>{node.name}</span>
          </p>
        )
      : inter && (
          <p>
            usage reached <em>{value}%</em> at <span>{inter.interface}</span>
          </p>
        );
  console.log(info);
  return (
    <>
      <div
        className="alarm-card"
        onClick={() => console.log("click")}
        onMouseEnter={
          admin ? () => toggleHover(true) : () => console.log("hi there")
        }
      >
        <h3>{type}</h3>

        {info || <p>Cannot retrieve data</p>}

        <span>
          <ReactTimeAgo date={createdAt} />
        </span>
        <div className={`buttons ${hover ? "active" : ""}`}>
          {admin && (
            <button
              className="icon-btn reverse"
              onClick={() => {
                remove(alarm._id);
              }}
            >
              <Remove />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default AlarmCard;
