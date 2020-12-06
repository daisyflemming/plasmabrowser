import React from 'react';

const ColorNucleotide = (props) => {
  const {sequence} = props;
  const nucleotide = sequence.split('');
  return (
    <div>
      {nucleotide.map((n) => <span className={'color-'+n}>{n}</span>)}
    </div>
  )
};

export default ColorNucleotide;
