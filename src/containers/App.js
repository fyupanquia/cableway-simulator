import React from "react";
import { connect } from 'react-redux'
import "../assets/css/App.css";
import "../assets/css/normalize.css";
import Controls from "../components/Controls";
import Indicators from "../components/Indicators";
import Scenary from "../components/Scenary";
import Booth from "../components/Booth";
import Man from "../components/Man";
import Woman from "../components/Woman";
import Tower from "../components/Tower";
import Character from './Character'
import { startTrip, stopTrip, resetTrip, setVelocity, setDistance } from '../actions'

function App({ 
				XPosition, startTrip, stopTrip, resetTrip, setVelocity, setDistance, 
				isMoving, traveledDistance, totalDistance, velocity, acceleration, timer, wasStopped,
				character }) {
	return !character ? <Character/>:
		<div>
		<Indicators
			traveledDistance={traveledDistance}
			totalDistance={totalDistance}
			velocity={velocity}
			acceleration={acceleration}
			timer={timer}
			isMoving={isMoving}
			setVelocity={setVelocity}
			setDistance={setDistance}
		/>
		<Controls
			startTrip={startTrip}
			stopTrip={stopTrip}
			resetTrip={resetTrip}
			isMoving={isMoving}
			wasStopped={wasStopped}
		/>
		<Scenary />
		<Booth XPosition={XPosition} />
		<Man />
		<Woman />
		<Tower position={'left'} />
		<Tower position={'rigth'} />
	</div>
}

const mapStateToProps = (state) => {
	return {
		XPosition: state.XPosition,
		isMoving: state.isMoving,
		traveledDistance: state.traveledDistance,
		totalDistance: state.totalDistance,
		velocity: state.velocity,
		acceleration: state.acceleration,
		timer: state.timer,
		wasStopped: state.wasStopped,
		character: state.character
	}
}

const mapDispatchToProps = {
	startTrip,
	stopTrip,
	resetTrip,
	setVelocity,
	setDistance
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
