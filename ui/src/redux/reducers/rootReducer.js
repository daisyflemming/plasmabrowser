import data from './sequences';
import geneExpression from './test';

const initState = {
  sequences: data.sequences,
  expressionCounts: geneExpression.counts,
  expressionAnnotations: geneExpression.annotations
}

const rootReducer = (state = initState, action) => {
  if (action.type === 'ADD_SEQUENCE'){
    let newSequence = {
      sequenceCounts: action.counts,
      sequenceAnnotations: action.annotations,
    }
    let sequences = [...state.sequences, newSequence];
    return {
      ...state,
      sequences: sequences
    }
  }
  return state;
}

export default rootReducer