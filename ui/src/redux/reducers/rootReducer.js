import geneExpression from './counts';

const initState = {
  expressionCounts: geneExpression.counts,
  expressionAnnotations: geneExpression.annotations
}

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
  return state;
}

export default rootReducer