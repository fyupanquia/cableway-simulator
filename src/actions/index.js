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
    //let __character__ = localStorage.getItem("__character__");
    let __character__ = `{"id":1,"genre":"M","name":"frank","wight":"65"}`;
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
    dispatch({
      type: "SET_ME",
      payload: 0,
    });
    dispatch({
      type: "SET_KE",
      payload: 0,
    });
    dispatch({
      type: "SET_GPE",
      payload: 0,
    });
    dispatch({
      type: "SET_KEF",
      payload: 0,
    });
    dispatch({
      type: "SET_GPEF",
      payload: 0,
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

export const calcGPE = ({ angle }) => {
  return async (dispatch, getState) => {
    let {
      boothAction,
      traveledDistance,
      gravity,
      mass,
      high,
      totalDistance,
      KE,
      GPEF,
    } = getState();

    console.log("distance", traveledDistance);
    console.log("angle", angle);

    let ep, ek, em;
    if (boothAction === "ADD_X") {
      high = parseFloat(Math.sin(angle) * traveledDistance).toFixed(2) * 1;
    } else {
      high =
        parseFloat(
          Math.sin(angle) * (totalDistance - traveledDistance)
        ).toFixed(2) * 1;
    }
    ep = parseFloat(gravity * mass * high).toFixed(2) * 1;
    em = parseFloat(KE + ep - GPEF).toFixed(2) * 1;

    dispatch({
      type: "SET_GPE",
      payload: ep,
    });
    dispatch({
      type: "SET_ME",
      payload: em,
    });
  };
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
        GPEF,
        KEF,
        YTowerB,
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

      const interval_time = parseFloat((seconds / steps).toFixed(4));

      let step =
        resume === true
          ? action === "ADD_X"
            ? parseInt(XPosition / intervalStep)
            : parseInt((steps * intervalStep - XPosition) / intervalStep)
          : 0;

      let high;
      let ek, ep, em;

      console.log("step ", step);
      console.log("steps ", steps);
      console.log("seconds ", seconds);
      console.log("interval_time ", interval_time);

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
        console.log("*****");
        if (action === "ADD_X") {
          high = parseFloat(Math.sin(angle) * distance).toFixed(2) * 1;
        } else {
          high =
            parseFloat(Math.sin(angle) * (totalDistance - distance)).toFixed(
              2
            ) * 1;
        }
        console.log("high", high);
        console.log("GPEF", GPEF);
        ep = parseFloat(gravity * mass * high).toFixed(2) * 1;
        ek = parseFloat(0.5 * mass * velocity ** 2) - KEF;
        em = parseFloat(ek + ep - GPEF).toFixed(2) * 1;

        dispatch({
          type: "SET_GPE",
          payload: ep,
        });
        dispatch({
          type: "SET_KE",
          payload: ek,
        });
        dispatch({
          type: "SET_ME",
          payload: em,
        });
        dispatch({
          type: "SET_TRAVELED_DISTANCE",
          payload: distance,
        });
        dispatch({
          type: "SET_TIMER",
          payload: parseFloat(timer.toFixed(1)),
        });

        console.log("ep", ep);
        console.log("ek", ek);
        console.log("me", em);
        console.log("*****");
      }
      dispatch({ type: "SET_MOVING", payload: false });

      if (index === steps) {
        if (action === "ADD_X") {
          high = YTowerB;
        } else {
          high = 0;
        }

        ek = 0;
        ep = parseFloat(gravity * mass * high).toFixed(2) * 1;
        em = parseFloat(ek + ep - GPEF).toFixed(2) * 1;
        dispatch({
          type: "SET_KE",
          payload: ek,
        });

        dispatch({
          type: "SET_GPE",
          payload: ep,
        });

        dispatch({
          type: "SET_ME",
          payload: em,
        });

        if (action === "ADD_X") {
          dispatch({
            type: "SET_KEF",
            payload: ek,
          });
          dispatch({
            type: "SET_GPEF",
            payload: ep,
          });
        } else {
          dispatch({
            type: "SET_KEF",
            payload: ek,
          });
          dispatch({
            type: "SET_GPEF",
            payload: 0,
          });
        }

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
