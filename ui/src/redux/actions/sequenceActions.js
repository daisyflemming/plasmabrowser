export const addSequence = (counts, annotations) => {
  return {
    type: 'ADD_SEQUENCE',
    counts,
    annotations
  }
};
