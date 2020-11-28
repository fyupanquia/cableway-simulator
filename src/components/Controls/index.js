import React from "react";
import "./controls.css";
import { connect } from "react-redux";
import { startTrip, stopTrip, resetTrip, showPassengers } from "../../actions";

const Control = ({
  characters,
  startTrip,
  stopTrip,
  resetTrip,
  isMoving,
  wasStopped,
  showPassengers,
}) => {
  const onContinue = () => {
    startTrip({ resume: true });
  };

  const onStop = () => {
    stopTrip();
  };

  return (
    <div id="controls">
      {!wasStopped ? (
        <button id="start" onClick={startTrip} disabled={isMoving}>
          START
        </button>
      ) : (
        <button id="reset" onClick={resetTrip} disabled={isMoving}>
          RESET
        </button>
      )}
      <button id="stop" onClick={onStop} disabled={!isMoving}>
        STOP
      </button>
      {wasStopped ? (
        <button id="continue" onClick={onContinue} disabled={isMoving}>
          CONTINUE
        </button>
      ) : null}
      <button
        id="characters"
        onClick={() => {
          showPassengers(true);
        }}
        disabled={isMoving}
      >
        CONNECTED {characters.length}
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isMoving: state.isMoving,
    wasStopped: state.wasStopped,
    characters: state.characters,
  };
};

const mapDispatchToProps = {
  startTrip,
  stopTrip,
  resetTrip,
  showPassengers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Control);
