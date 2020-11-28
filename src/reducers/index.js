const ADMIN = "frank";
const detafultVelocity = 0;
const defaultDistance = 0;
const defaultState = {
  boothAction: null,
  timer: 0,
  isMoving: false,
  XPosition: 0,
  YPosition: 0,
  traveledDistance: 0,
  totalDistance: defaultDistance,
  velocity: detafultVelocity,
  acceleration: 0,
  wasStopped: false,
  character: {
    assigned: false,
    isAdmin: function () {
      return this.name === ADMIN;
    },
  },
  characters: [],
  showPassengers:false
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
      //console.log(reducerState.XPosition)
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
        //wasStopped: action.payload===false || reducerState.wasStopped,
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
    default:
      return reducerState;
  }
};

export default reducer;
