const initState = {}

const rootReducer = (state = initState, action) => {
  if (action.type === 'ADD_SEQUENCE'){
    let expressionCounts = action.counts,
      expressionAnnotations = action.annotations;
    return {
      ...state,
      expressionCounts,
      expressionAnnotations
    }
  }
  if (action.type === 'TOGGLE_LOADING'){
    let loading = ! state.loading ? true: false;
      return {
        ...state,
        loading
      }
  }

  return state;
}

export default rootReducer