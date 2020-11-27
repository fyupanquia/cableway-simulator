import React, { Fragment, useState } from "react";
import "./character.css";

import man from "../../assets/imgs/man.png";
import woman from "../../assets/imgs/woman.png";
import { connect } from "react-redux";

import { setGenre, setName, setWeight, setAssigned } from "../../actions";

const Character = ({
  character,
  setGenre,
  setName,
  setWeight,
  setAssigned,
}) => {
  const [newName, setNewName] = useState(character ? character.name : "");
  const [newWeight, setNewWeight] = useState(character ? character.weight : "");

  return (
    <Fragment>
      <div id="character">
        <label>CHOOSE YOUR GENRE:</label>
        <div className="form-field characters">
          <img
            className={
              "boy " + (character && character.genre === "M" ? "selected" : "")
            }
            src={man}
            onClick={() => setGenre("M")}
            alt=""
          />
          <img
            className={
              "girl " + (character && character.genre === "F" ? "selected" : "")
            }
            src={woman}
            onClick={() => setGenre("F")}
            alt=""
          />
        </div>
        <div className="form-field genre-weight">
          {character && character.genre ? (
            <div>
              <label htmlFor="iname">ENTER YOUR NAME:</label>
              <input
                id="iname"
                onKeyUp={(e) => {
                  if (e.key === "Enter") setName(newName);
                }}
                onBlur={() => setName(newName)}
                onChange={(evt) => setNewName(evt.target.value.trim())}
              />
            </div>
          ) : (
            ""
          )}
          {character && character.genre ? (
            <div>
              <label htmlFor="iweight">ENTER YOUR WEIGHT:</label>
              <input
                id="iweight"
                type="number"
                step="any"
                onKeyUp={(e) => {
                  if (e.key === "Enter") setWeight(newWeight);
                }}
                onBlur={() => setWeight(newWeight)}
                onChange={(evt) => setNewWeight(evt.target.value.trim())}
              />
            </div>
          ) : (
            ""
          )}
        </div>
        {character && character.genre && character.name && character.weight ? (
          <>
            <div className="form-field">
              <input
                type="button"
                value="CLICK HERE TO ENTER!"
                onClick={() => setAssigned(character)}
              />
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    character: state.character,
  };
};
const mapDispatchToProps = { setGenre, setName, setWeight, setAssigned };

export default connect(mapStateToProps, mapDispatchToProps)(Character);
