import React from "react";
import "./indicators.css";

export default ({ traveledDistance, totalDistance, velocity, acceleration, timer }) => {
    return <div id='indicators'>
        <table>
            <thead>
                <tr>
                    <th>Velocity</th>
                    <th>Acceleration</th>
                    <th>Total Distance</th>
                    <th>Traveled Distance</th>
                    <th>Booth Weight</th>
                    <th>Load Weight</th>
                    <th>Total Weight</th>
                    <th>Timer</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{velocity}m/s</td>
                    <td>{acceleration}m/s²</td>
                    <td>{traveledDistance}m</td>
                    <td>{totalDistance}m</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>{timer}s</td>
                </tr>
            </tbody>
        </table>
    </div>
};
