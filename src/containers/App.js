import React, { useEffect } from "react";
import { connect } from "react-redux";
import "../assets/css/App.css";
import "../assets/css/normalize.css";
import Controls from "../components/Controls";
import Indicators from "../components/Indicators";
import Scenary from "../components/Scenary";
import Booth from "../components/Booth";
import Tower from "../components/Tower";
import Character from "./Character";
import { checkAdmin } from "../actions";

function App({ XPosition, character, checkAdmin }) {
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
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    XPosition: state.XPosition,
    character: state.character,
  };
};

const mapDispatchToProps = {
  checkAdmin,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
