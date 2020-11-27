import React, { useState } from "react";
import "./indicators.css";


const isValidKey = (event) => {
    const keycode = event.which
    if (!(event.shiftKey === false && (keycode === 46 || keycode === 8 || keycode === 37 || keycode === 39 || (keycode >= 48 && keycode <= 57)))) {
        event.preventDefault();
    }
}

export default ({ traveledDistance, totalDistance, velocity, acceleration, timer, setVelocity, setDistance, isMoving }) => {

    const [newVelocity, setNewVelocity] = useState('')
    const [newDistance, setNewDistance] = useState('')
    const [showVI, setShowVI] = useState(false)
    const [showDI, setShowDI] = useState(false)

    const assignVelocity = () => {
        setVelocity(parseFloat(newVelocity))
        setShowVI(false)
    }

    const assignDistance = () => {
        setDistance(parseFloat(newDistance))
        setShowDI(false)
    }

    const handleKeyPressVI = (event) => {
        if (event.key === 'Enter') assignVelocity()
        isValidKey(event)
    }

    const handleKeyPressDI = (event) => {
        if (event.key === 'Enter') assignDistance()
        isValidKey(event)
    }

    return <div id='indicators'>
        <table>
            <thead>
                <tr>
                    <th>Velocity</th>
                    <th>Acceleration</th>
                    <th>Traveled Distance</th>
                    <th>Total Distance</th>
                    <th>Timer</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        {
                            showVI ?
                                <input onKeyPress={handleKeyPressVI} onBlur={assignVelocity} onChange={evt => setNewVelocity(evt.target.value)} ></input>
                                :
                                <span className='as-btn' onDoubleClick={isMoving ? null : () => setShowVI(true)}>{velocity}</span>
                        }
                        m/s
                    </td>
                    <td>{acceleration}m/s²</td>
                    <td>{traveledDistance}m</td>
                    <td>
                        {
                            showDI ?
                                <input onKeyPress={handleKeyPressDI} onBlur={assignDistance} onChange={evt => setNewDistance(evt.target.value)} ></input>
                                :
                                <span className='as-btn' onDoubleClick={isMoving ? null : () => setShowDI(true)} >{totalDistance}</span>
                        }
                        m
                    </td>
                    <td>{timer}s</td>
                </tr>
            </tbody>
        </table>
    </div>
};
