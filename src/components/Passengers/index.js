import React from "react";
import { connect } from "react-redux";
import "./passengers.css";
import Passenger from "../Passenger"
import { showPassengers } from '../../actions'

const Passengers = ({ characters, showPassengers }) => {

  return (
    <div id="popup" className="overlay">
      <div className="popupBody">
        <h3>Connected</h3>
        <a onClick={(e)=> { showPassengers(false) }}>
          &times;
        </a>
        <div className="popupContent">
          <ul>
            {characters.map((c) => {
              return <Passenger key={c.id} character={c} />;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    characters: state.characters,
  };
};

const mapDispatchToProps = {
	showPassengers
};

export default connect(mapStateToProps, mapDispatchToProps)(Passengers);
