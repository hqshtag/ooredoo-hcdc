import React, { useEffect, useState } from "react";
import { ReactComponent as CheckSVG } from "../../../assets/icons/check.svg";
import { ReactComponent as ErrorSVG } from "../../../assets/icons/errors.svg";
import { ReactComponent as WarningSVG } from "../../../assets/icons/warning.svg";
import { ReactComponent as InfoSVG } from "../../../assets/icons/info.svg";

const Card = ({ message, type, close, show, index }) => {
  const [cardShow, setCardShow] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => {
      close(index);
    }, 3000);
    let timer2 = setTimeout(() => {
      setCardShow(show);
    }, 240);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [show, index, close]);

  //console.log(key);
  const styles = {
    bottom: `${index * 108 + 90}px`,
  };

  return (
    <div
      className={`alert-card ${type} ${cardShow ? "in" : "out"}`}
      style={styles}
      onClick={() => close(index)}
    >
      {type === "info" && <InfoSVG />}
      {type === "warning" && <WarningSVG />}
      {type === "error" && <ErrorSVG />}
      {type === "success" && <CheckSVG />}
      <label>{message}</label>
    </div>
  );
};

export default Card;
