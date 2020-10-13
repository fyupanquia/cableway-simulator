import React from "react";
import './controls.css'
export default ({ startTrip, stopTrip, resetTrip, isMoving, wasStopped }) => {

    const onContinue = () => {
        startTrip({ resume: true })
    }

    const onStop = () => {
        stopTrip()
    }

    return <div id='controls'>
        {
            !wasStopped ? 
            <button id='start' onClick={startTrip} disabled={isMoving}>START</button> :
            <button id='reset' onClick={resetTrip} disabled={isMoving}>RESET</button>
        }
        <button id='stop'  onClick={onStop} disabled={!isMoving}>STOP</button>
        {
            wasStopped ? 
            <button id='continue'  onClick={onContinue} disabled={ isMoving }>CONTINUE</button> :
            null
        }
    </div>
};
