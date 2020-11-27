import React from "react";
import "./booth.css";
import booth from "../../assets/imgs/booth.png";

export default ({ XPosition }) => {
  return <img id="booth" src={booth} alt="" style={{ left: XPosition }} />;
}
