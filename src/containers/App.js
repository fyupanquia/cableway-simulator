import React, { useEffect } from "react";
import { connect } from "react-redux";
import "../assets/css/App.css";
import "../assets/css/normalize.css";
import Controls from "../components/Controls";
import Indicators from "../components/Indicators";
import Scenary from "../components/Scenary";
//import Socket from "../components/Socket";
import Booth from "../components/Booth";
import Tower from "../components/Tower";
import UTP from "../components/UTP";
import Character from "./Character";
import Passengers from "../components/Passengers";
import { checkAdmin } from "../actions";
import Wire from "../components/Wire"

function App({ XPosition, character, checkAdmin, showPassengers }) {
  useEffect(() => {
    checkAdmin();
  }, [checkAdmin]);

  return !character.assigned ? (
    <Character />
  ) : (
    <div>
      <Indicators />
      {character.isAdmin() ? <Controls /> : ""}
      <Scenary />
      <Booth XPosition={XPosition} />
      <Tower position={"left"} />
      <Tower position={"rigth"} />
      <Wire />
      {showPassengers ? <Passengers /> : ""}
      <UTP/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    XPosition: state.XPosition,
    character: state.character,
    showPassengers: state.showPassengers,
  };
};

const mapDispatchToProps = {
  checkAdmin,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
