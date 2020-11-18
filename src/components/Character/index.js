import React from "react";
import './character.css'

import man from "../../assets/imgs/man.png";
import woman from "../../assets/imgs/woman.png";

export default ({ startTrip, stopTrip, resetTrip, isMoving, wasStopped }) => {

    return <div id='character'>
        <div className='characters'>
            <img className="girl" src={man} alt="" />
            <img className="boy" src={woman} alt="" />
        </div>
    </div>
};
