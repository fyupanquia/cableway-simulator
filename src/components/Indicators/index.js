import React, { useState, useEffect } from "react";
import "./indicators.css";
import { connect } from "react-redux";
import {
  setVelocity,
  setDistance,
  setMass,
  setYTowerB,
  setAngle,
  calcGPE,
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
  KE,
  ME,
  calcGPE,
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
    let _newVelocity = parseFloat(newVelocity).toFixed(2) * 1;
    if (_newVelocity > 0) {
      setVelocity(parseFloat(_newVelocity));
      setNewVelocity(_newVelocity);
    }
    setShowVI(false);
  };

  const assignDistance = () => {
    let _newDistance = parseFloat(newDistance).toFixed(2) * 1;
    if (
      _newDistance >= 0 && traveledDistance<_newDistance && 
      (traveledDistance===0 || traveledDistance === totalDistance)
    ) {
      setDistance(_newDistance);
      setNewDistance(_newDistance);
    }

    setShowDI(false);
  };

  const assignMass = () => {
    let _newMass = parseFloat(newMass).toFixed(2) * 1;
    if (_newMass >= 0) {
      setMass(_newMass);
      setNewMass(_newMass);
    }
    setShowMI(false);
  };

  const assignYTB = () => {
    let _newYTowerB = parseFloat(newYTowerB).toFixed(2) * 1;
    if (_newYTowerB && totalDistance > _newYTowerB) {
      setYTowerB(_newYTowerB);
      setNewYTowerB(_newYTowerB);
    }
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
	  //angle = parseFloat(Math.asin(YTowerB / totalDistance)).toFixed(2) * 1;
	  angle = Math.asin(YTowerB / totalDistance);
      setNewAngle(parseFloat(angle * (180 / Math.PI)).toFixed(2));
    } else setNewAngle(angle);

    setAngle(angle);
    calcGPE({ angle });
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
            <th>K.E.</th>
            <th>G.P.E.</th>
            <th>ΔM.E.</th>
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
            <td>{KE}J</td>
            <td>{GPE}J</td>
            <td>{ME}J</td>
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
    KE: state.KE,
    ME: state.ME,
  };
};

const mapDispatchToProps = {
  setVelocity,
  setDistance,
  setMass,
  setYTowerB,
  setAngle,
  calcGPE,
};

export default connect(mapStateToProps, mapDispatchToProps)(Indicator);
