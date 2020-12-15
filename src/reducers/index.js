const ADMIN = "frank";
const detafultVelocity = 5;
const defaultDistance = 100;
const defaultMass = 50;
const defaultYTowerB = 50;
const defaultAngle = 0;
const GPE = 0;
const KE = 0;
const ME = 0;
const gravity = 9.81;
const boothAction = "ADD_X";
const GPEF = 0;
const KEF = 0;
const defaultState = {
  boothAction,
  timer: 0,
  isMoving: false,
  XPosition: 0,
  YPosition: 0,
  traveledDistance: 0,
  totalDistance: defaultDistance,
  velocity: detafultVelocity,
  mass: defaultMass,
  wasStopped: false,
  YTowerB: defaultYTowerB,
  character: {
    assigned: false,
    isAdmin: function () {
      return this.name === ADMIN;
    },
  },
  characters: [],
  showPassengers: false,
  angle: defaultAngle,
  GPE,
  GPEF,
  KE,
  KEF,
  ME,
  gravity,
};
defaultState.screenWidth = document.getElementById("root").offsetWidth;
defaultState.screenHeight = document.getElementById("root").offsetHeight;

const reducer = (state, action) => {
  const reducerState = {
    ...defaultState,
    ...state,
  };

  switch (action.type) {
    case "SET_X":
      return {
        ...reducerState,
        XPosition: action.payload,
      };
    case "ADD_X":
      reducerState.XPosition += action.payload || 1;
      return {
        ...reducerState,
      };
    case "RMV_X":
      reducerState.XPosition -= action.payload || 1;
      return {
        ...reducerState,
      };
    case "ADD_Y":
      reducerState.YPosition += action.payload || 1;
      return {
        ...reducerState,
      };
    case "SET_MOVING":
      return {
        ...reducerState,
        isMoving: action.payload,
      };
    case "SET_TRAVELED_DISTANCE":
      return {
        ...reducerState,
        traveledDistance: action.payload,
      };
    case "SET_TIMER":
      return {
        ...reducerState,
        timer: action.payload,
      };
    case "SET_BOOTH_ACTION":
      return {
        ...reducerState,
        boothAction: action.payload,
      };
    case "SET_WAS_STOPPED":
      return {
        ...reducerState,
        wasStopped: action.payload,
      };
    case "SET_VELOCITY":
      return {
        ...reducerState,
        velocity: action.payload || detafultVelocity,
      };
    case "SET_DISTANCE":
      return {
        ...reducerState,
        totalDistance: action.payload || defaultDistance,
      };
    case "SET_MASS":
      return {
        ...reducerState,
        mass: action.payload || defaultMass,
      };
    case "SET_GENRE":
      return {
        ...reducerState,
        character: {
          ...reducerState.character,
          genre: action.payload,
        },
      };
    case "SET_NAME":
      return {
        ...reducerState,
        character: {
          ...reducerState.character,
          name: action.payload,
        },
      };
    case "SET_WEIGHT":
      return {
        ...reducerState,
        character: {
          ...reducerState.character,
          weight: action.payload,
        },
      };
    case "SET_ASSIGNED":
      return {
        ...reducerState,
        character: {
          ...reducerState.character,
          assigned: action.payload,
        },
      };
    case "SET_ID":
      return {
        ...reducerState,
        character: {
          ...reducerState.character,
          id: action.payload,
        },
      };
    case "SET_CHARACTERS":
      return {
        ...reducerState,
        characters: action.payload,
      };
    case "SET_SHOW_PASSENGERS":
      return {
        ...reducerState,
        showPassengers: action.payload,
      };
    case "SET_Y_TOWER_B":
      return {
        ...reducerState,
        YTowerB: action.payload,
      };
    case "SET_ANGLE":
      return {
        ...reducerState,
        angle: action.payload,
      };
    case "SET_GPE":
      return {
        ...reducerState,
        GPE: action.payload,
      };
    case "SET_KE":
      return {
        ...reducerState,
        KE: action.payload,
      };
    case "SET_GPEF":
      return {
        ...reducerState,
        GPEF: action.payload,
      };
    case "SET_KEF":
      return {
        ...reducerState,
        KEF: action.payload,
      };
    case "SET_ME":
      return {
        ...reducerState,
        ME: action.payload,
      };
    default:
      return reducerState;
  }
};

export default reducer;
