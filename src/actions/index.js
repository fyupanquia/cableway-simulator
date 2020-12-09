import uuid from "random-uuid-v4";

export const setGenre = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_GENRE",
      payload,
    });
  };
};

export const setName = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NAME",
      payload,
    });
  };
};

export const setWeight = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_WEIGHT",
      payload,
    });
  };
};

export const setAssigned = (payload) => {
  payload.assigned = true;
  payload.id = uuid();
  localStorage.setItem("__character__", JSON.stringify(payload));
  return async (dispatch) => {
    dispatch({
      type: "SET_ASSIGNED",
      payload: payload.assigned,
    });
  };
};

export const checkAdmin = (payload) => {
  return async (dispatch) => {
    let __character__ = localStorage.getItem("__character__");
    if (!__character__) return false;
    __character__ = JSON.parse(__character__);

    if (!__character__) return false;

    dispatch({
      type: "SET_ID",
      payload: __character__.id,
    });
    dispatch({
      type: "SET_GENRE",
      payload: __character__.genre,
    });
    dispatch({
      type: "SET_NAME",
      payload: __character__.name,
    });
    dispatch({
      type: "SET_WEIGHT",
      payload: __character__.weight,
    });
    dispatch({
      type: "SET_ASSIGNED",
      payload: true,
    });
  };
};

export const showPassengers = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_SHOW_PASSENGERS",
      payload,
    });
  };
};

export const setVelocity = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_VELOCITY",
      payload,
    });
  };
};

export const setDistance = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_DISTANCE",
      payload,
    });
  };
};

export const setMass = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_MASS",
      payload,
    });
  };
};

export const setYTowerB = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_Y_TOWER_B",
      payload,
    });
  };
};

export const setAngle = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_ANGLE",
      payload,
    });
  };
};

export const stopTrip = () => {
  return async (dispatch) => {
    dispatch({
      type: "SET_MOVING",
      payload: false,
    });
  };
};

export const resetTrip = () => {
  return async (dispatch) => {
    dispatch({
      type: "SET_MOVING",
      payload: false,
    });
    dispatch({
      type: "SET_TIMER",
      payload: 0,
    });
    dispatch({
      type: "SET_TRAVELED_DISTANCE",
      payload: 0,
    });
    dispatch({
      type: "SET_X",
      payload: 0,
    });
    dispatch({
      type: "SET_WAS_STOPPED",
      payload: false,
    });
  };
};

const waitMotion = (fnt, arg, time) => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        fnt.call(null, arg);
        resolve();
      }, time);
    } catch (error) {
      reject(error);
    }
  });
};

export const startTrip = ({ resume }) => {
  return async (dispatch, getState) => {
    try {
      const intervalStep = 5;
      const {
        screenWidth,
        XPosition,
        totalDistance,
        boothAction,
        velocity,
        angle,
        gravity,
        mass,
      } = getState();
      let { timer } = getState();

      if (velocity <= 0 || totalDistance <= 0) return;

      dispatch({ type: "SET_MOVING", payload: true });
      if (resume !== true) {
        dispatch({ type: "SET_TRAVELED_DISTANCE", payload: 0 });
        dispatch({ type: "SET_TIMER", payload: 0 });
        timer = 0;
      }

      let seconds = parseFloat((totalDistance / velocity).toFixed(2));
      const action =
        resume === true
          ? boothAction
          : screenWidth / 2 > XPosition
          ? "ADD_X"
          : "RMV_X";

      dispatch({ type: "SET_BOOTH_ACTION", payload: action });
      const booth = document.getElementById("booth");
      const rigthTower = document.getElementsByClassName("tower rigth")[0];

      const rigthTowerWidth = rigthTower.width;
      const boothWidth = booth.width;

      const steps = parseInt(
        (screenWidth - (boothWidth + rigthTowerWidth / 4)) / intervalStep
      );

      const interval_time = parseFloat((seconds / steps).toFixed(2));

      let step =
        resume === true
          ? action === "ADD_X"
            ? parseInt(XPosition / intervalStep)
            : parseInt((steps * intervalStep - XPosition) / intervalStep)
          : 0;

      let high;
      let ek, ep;

      for (var index = step; index < steps; index++) {
        const { isMoving } = getState();
        if (!isMoving) break;

        await waitMotion(
          dispatch,
          {
            type: action,
            payload: intervalStep,
          },
          interval_time * 1000
        );

        const distance = parseFloat(
          (totalDistance * ((index + 1) / steps)).toFixed(2)
        );
        timer += interval_time;

        if (action === "ADD_X") {
          high = Math.sin(angle) * distance;
          ep = parseFloat(gravity * mass * high).toFixed(1) * 1;
          dispatch({
            type: "SET_GPE",
            payload: ep,
          });
        } else {
          high = Math.sin(angle) * (totalDistance - distance);
          ep = parseFloat(gravity * mass * high).toFixed(1) * 1;
          dispatch({
            type: "SET_GPE",
            payload: ep,
          });
        }

        ek = parseFloat(0.5 * mass * velocity ** 2);
        dispatch({
          type: "SET_KE",
          payload: ek,
        });

        dispatch({
          type: "SET_ME",
          payload: ek + ep,
        });

        dispatch({
          type: "SET_TRAVELED_DISTANCE",
          payload: distance,
        });
        dispatch({
          type: "SET_TIMER",
          payload: parseFloat(timer.toFixed(1)),
        });
      }
      dispatch({ type: "SET_MOVING", payload: false });

      if (index === steps) {
        ek = 0;
        dispatch({
          type: "SET_KE",
          payload: ek,
        });
        dispatch({
          type: "SET_ME",
          payload: ek + ep,
        });

        dispatch({
          type: "SET_W",
          payload: 0 + ep,
        });
        dispatch({ type: "SET_WAS_STOPPED", payload: false });
        dispatch({ type: "SET_TIMER", payload: seconds });
        dispatch({ type: "SET_TRAVELED_DISTANCE", payload: totalDistance });
      } else {
        // it was stopped
        dispatch({ type: "SET_WAS_STOPPED", payload: true });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "SET_MOVING", payload: false });
    }
  };
};

export const setCharacters = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_CHARACTERS",
      payload,
    });
  };
};
