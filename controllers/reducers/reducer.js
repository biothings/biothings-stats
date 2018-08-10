let initalState ={
  something: 'initial value'
}

const rootReducer = (state = initalState, action) => {
  // console.log('reducer runnning', action);
  switch (action.type) {
    case "TEST":
      return Object.assign({}, state, { something: action.payload });
      break;
    default:
      return state
  }
}

export default rootReducer;
