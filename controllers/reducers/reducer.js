let initalState ={
  user: {},
  mapData: []
}

const rootReducer = (state = initalState, action) => {
  // console.log('reducer action: ', action);
  switch (action.type) {
    case "USER-UPDATE":
      return Object.assign({}, state, { user: action.payload });
      break;
    case "USER-LOGOUT":
      return Object.assign({}, state, { user: {} });
      break;
    case "UPDATE-MAP":
      return Object.assign({}, state, { mapData: action.payload });
      break;
    default:
      return state
  }
}

export default rootReducer;
