let initalState ={
  user: {}
}

const rootReducer = (state = initalState, action) => {
  // console.log('reducer runnning', action);
  switch (action.type) {
    case "USER-UPDATE":
      return Object.assign({}, state, { user: action.payload });
      break;
    case "USER-LOGOUT":
      return Object.assign({}, state, { user: {} });
      break;
    default:
      return state
  }
}

export default rootReducer;
