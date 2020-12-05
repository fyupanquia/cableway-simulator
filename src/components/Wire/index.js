import React from "react";
import { connect } from "react-redux";
import "./wire.css"

import wireFord from "../../assets/imgs/wire-ford.gif";
import wireBack from "../../assets/imgs/wire-back.gif";
import wirePNG from "../../assets/imgs/wire.png";

const Wire = ({ isMoving, boothAction }) => {
  return (
    <div
      className="wire"
      style={{
        backgroundImage: `url(${
          isMoving ? (boothAction === "ADD_X" ? wireFord : wireBack) : wirePNG
        })`,
      }}
    ></div>
  );
};


const mapStateToProps = (state) => {
  return {
    isMoving: state.isMoving,
    boothAction: state.boothAction,
  };
};

export default connect(mapStateToProps, null)(Wire);
