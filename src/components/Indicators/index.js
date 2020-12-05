import React, { useState, useEffect } from "react";
import "./indicators.css";
import { connect } from "react-redux";
import {
  setVelocity,
  setDistance,
  setMass,
  setYTowerB,
  setAngle,
} from "../../actions";

const isValidKey = (event) => {
  const keycode = event.which;
  if (
    !(
      event.shiftKey === false &&
      (keycode === 46 ||
        keycode === 8 ||
        keycode === 37 ||
        keycode === 39 ||
        (keycode >= 48 && keycode <= 57))
    )
  ) {
    event.preventDefault();
  }
};
const Indicator = ({
  traveledDistance,
  totalDistance,
  velocity,
  mass,
  YTowerB,
  timer,
  isMoving,
  character,
  setVelocity,
  setDistance,
  setMass,
  setYTowerB,
  setAngle,
  GPE,
}) => {
  const [newYTowerB, setNewYTowerB] = useState("");
  const [newMass, setNewMass] = useState("");
  const [newVelocity, setNewVelocity] = useState("");
  const [newDistance, setNewDistance] = useState("");
  const [showMI, setShowMI] = useState(false);
  const [showVI, setShowVI] = useState(false);
  const [showDI, setShowDI] = useState(false);
  const [showYTBI, setShowYTBI] = useState(false);
  const [newangle, setNewAngle] = useState(0);

  const assignVelocity = () => {
    setVelocity(parseFloat(newVelocity));
    setShowVI(false);
  };

  const assignDistance = () => {
    if (newDistance) setDistance(parseFloat(newDistance));
    setShowDI(false);
  };

  const assignMass = () => {
    if (newMass) setMass(parseFloat(newMass));
    setShowMI(false);
  };

  const assignYTB = () => {
    if (newYTowerB && totalDistance > newYTowerB)
      setYTowerB(parseFloat(newYTowerB));
    setShowYTBI(false);
  };

  const handleKeyPress = (event) => {
    /* eslint no-eval: 0 */
    if (event.key === "Enter") eval(event._enter)();
    isValidKey(event);
  };

  useEffect(() => {
    let angle = 0;
    if (totalDistance > 0 && YTowerB > 0 && totalDistance > YTowerB) {
	  angle = Math.asin(YTowerB / totalDistance)
	  setNewAngle(parseFloat(angle * (180 / Math.PI)).toFixed(1));
    } else setNewAngle(angle);

    setAngle(angle);
  }, [totalDistance, YTowerB]);

  return (
    <div id="indicators">
      <table>
        <thead>
          <tr>
            <th>Velocity</th>
            <th>Mass</th>
            <th>Traveled</th>
            <th>Distance</th>
            <th>Tower B</th>
            <th>Angle</th>
            <th>G.P.E.</th>
            <th>Timer</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {showVI ? (
                <input
                  name="cmb"
                  onKeyPress={(event) => {
                    event._enter = "assignVelocity";
                    handleKeyPress(event);
                  }}
                  onBlur={assignVelocity}
                  onChange={(evt) => setNewVelocity(evt.target.value)}
                ></input>
              ) : (
                <span
                  className="as-btn"
                  onDoubleClick={
                    isMoving || !character.isAdmin()
                      ? null
                      : () => setShowVI(true)
                  }
                >
                  {velocity} m/s
                </span>
              )}
            </td>
            <td>
              {showMI ? (
                <input
                  onKeyPress={(event) => {
                    event._enter = "assignMass";
                    handleKeyPress(event);
                  }}
                  onBlur={assignMass}
                  onChange={(evt) => setNewMass(evt.target.value)}
                ></input>
              ) : (
                <span
                  onDoubleClick={
                    isMoving || !character.isAdmin()
                      ? null
                      : () => setShowMI(true)
                  }
                >
                  {mass}kg
                </span>
              )}
            </td>
            <td>{traveledDistance}m</td>
            <td>
              {showDI ? (
                <input
                  onKeyPress={(event) => {
                    event._enter = "assignDistance";
                    handleKeyPress(event);
                  }}
                  onBlur={assignDistance}
                  onChange={(evt) => setNewDistance(evt.target.value)}
                ></input>
              ) : (
                <span
                  className="as-btn"
                  onDoubleClick={
                    isMoving || !character.isAdmin()
                      ? null
                      : () => setShowDI(true)
                  }
                >
                  {totalDistance}m
                </span>
              )}
            </td>
            <td>
              {showYTBI ? (
                <input
                  onKeyPress={(event) => {
                    event._enter = "assignYTB";
                    handleKeyPress(event);
                  }}
                  onBlur={assignYTB}
                  onChange={(evt) => setNewYTowerB(evt.target.value)}
                ></input>
              ) : (
                <span
                  className="as-btn"
                  onDoubleClick={
                    isMoving || !character.isAdmin() || !totalDistance
                      ? null
                      : () => setShowYTBI(true)
                  }
                >
                  {YTowerB}m
                </span>
              )}
            </td>
            <td>{newangle}°</td>
            <td>{GPE}J</td>
            <td>{timer}s</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    traveledDistance: state.traveledDistance,
    totalDistance: state.totalDistance,
    velocity: state.velocity,
    mass: state.mass,
    timer: state.timer,
    isMoving: state.isMoving,
    character: state.character,
    YTowerB: state.YTowerB,
    GPE: state.GPE,
  };
};

const mapDispatchToProps = {
  setVelocity,
  setDistance,
  setMass,
  setYTowerB,
  setAngle,
};

export default connect(mapStateToProps, mapDispatchToProps)(Indicator);
