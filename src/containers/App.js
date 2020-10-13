import { connect } from 'react-redux'
import "../assets/css/App.css";
import "../assets/css/normalize.css";
import React from "react";
import Controls from "../components/Controls";
import Indicators from "../components/Indicators";
import Scenary from "../components/Scenary";
import Booth from "../components/Booth";
import Man from "../components/Man";
import Woman from "../components/Woman";
import Tower from "../components/Tower";
import { startTrip, stopTrip, resetTrip } from '../actions'

function App({ XPosition, startTrip, stopTrip, resetTrip, isMoving, traveledDistance, totalDistance, velocity, acceleration, timer, wasStopped }) {
	return <div> 
		<Indicators 
			traveledDistance={traveledDistance} 
			totalDistance={totalDistance} 
			velocity={velocity} 
			acceleration={acceleration} 
			timer={timer}/>
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
	}
}

const mapDispatchToProps = {
	startTrip,
	stopTrip,
	resetTrip
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
