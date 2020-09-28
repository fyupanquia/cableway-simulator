import React from "react";
import "./tower.css";
import tower from "../../assets/imgs/tower.png";

export default ({ position }) => {
  return <img class={`tower ${position}`} src={tower} alt="" />;
};
