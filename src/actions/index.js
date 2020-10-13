export const stopTrip = () => {
	return async (dispatch) => {
		dispatch({
			type: 'SET_MOVING',
			payload: false
		})
	}
}

export const resetTrip = () => {
	return async (dispatch) => {
		dispatch({
			type: 'SET_MOVING',
			payload: false
		})
		dispatch({
			type: 'SET_TIMER',
			payload: 0
		})
		dispatch({
			type: 'SET_TRAVELED_DISTANCE',
			payload: 0
		})
		dispatch({
			type: 'SET_X',
			payload: 0
		})
		dispatch({
			type: 'SET_WAS_STOPPED',
			payload: false
		})
	}
}

const waitMotion = (fnt, arg) => {
	return new Promise((resolve, reject) => {
		try {
			setTimeout(() => {
				fnt.call(null, arg);
				resolve();
			}, 100)
		} catch (error) {
			reject(error);
		}
	})
}

export const startTrip = ({ resume }) => {
	return async (dispatch, getState) => {
		try {
			const intervalStep = 5
			dispatch({ type: 'SET_TRAVELED_DISTANCE', payload: 0 })
			dispatch({ type: 'SET_MOVING', payload: true })

			const { screenWidth, XPosition, totalDistance, boothAction } = getState()
			let { timer } = getState()

			if (resume!==true) dispatch({ type: 'SET_TIMER', payload: 0 })
			
			const action = resume === true ? boothAction : (screenWidth / 2 > XPosition ? 'ADD_X' : 'RMV_X')

			dispatch({ type: 'SET_BOOTH_ACTION', payload: action })
			const booth = document.getElementById('booth')
			const rigthTower = document.getElementsByClassName('tower rigth')[0]

			const rigthTowerWidth = rigthTower.width
			const boothWidth = booth.width
			let step = resume === true ? parseInt(XPosition / intervalStep) : 0
			const steps = parseInt((screenWidth - (boothWidth + (rigthTowerWidth / 4))) / intervalStep)

			for (let index = step; index < steps; index++) {
				const { isMoving } = getState()
				if (isMoving) {
					await waitMotion(dispatch, {
						type: action,
						payload: intervalStep
					});
					const distance = totalDistance * ((index + 1) / steps)
					timer += 0.1

					dispatch({ type: 'SET_TRAVELED_DISTANCE', payload: parseFloat(distance.toFixed(2)) })
					dispatch({ type: 'SET_TIMER', payload: parseFloat(timer.toFixed(1)) })
				} else {
					break;
				}
			}
			dispatch({ type: 'SET_MOVING', payload: false })

		} catch (error) {
			console.log(error)
			dispatch({ type: 'SET_MOVING', payload: false })
		}

	}
}
