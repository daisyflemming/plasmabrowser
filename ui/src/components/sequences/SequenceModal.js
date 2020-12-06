import React from 'react';
import ColorNucleotide from "./ColorNucleotide";

const truncateSequence =(s)=>{
  let list = [];
  let charPerRow = 50;
  let lines = s.length /charPerRow;
  for (let i=0; i < lines; i++) {
    list[i] = s.slice(i*charPerRow, (i+1)*charPerRow)
  }
  return list;
};

const SequenceModal = (props) => {
  const id = '_' + Math.random().toString(36).substr(2, 9);
  const {data} = props;
  const sequenceList = truncateSequence(data.sequence);
  return (
    <div >
        <div id={id} className={'modal-content'}>
          <h4>{data['sequenceName']}</h4>
          {sequenceList.map((s) => <ColorNucleotide sequence={s}/>)}
        </div>
    </div>
  )
};

export default SequenceModal;
