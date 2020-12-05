import React from "react";
import { connect } from "react-redux";
import './passenger.css'

const Passenger = ({ character }) => {

    const name =
      character && character.name ? character.name.toUpperCase() : "UNKNOW";
    const weight = character && character.weight ? character.weight : "???";
      const genre =
        character && character.genre ? character.genre.toUpperCase() : "???";

  return (
    <li className='character-passenger'>
      <div>
        Name:{name}, Weight:{weight} and Genre:<b>{genre}</b>
      </div>
      <div>
          <input type="button" value={"ADD"} />
      </div>
    </li>
  );
};

const mapStateToProps = (state) => {
  return {
    
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Passenger);
