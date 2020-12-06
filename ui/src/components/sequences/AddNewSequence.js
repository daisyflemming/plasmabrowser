import React from 'react';
import UploadForm from './UploadForm';
import {addSequence} from '../../redux/actions/sequenceActions';
import {connect} from 'react-redux';

class AddNewSequence extends React.Component {
  addNewSequence = values => {
    this.props.addSequence(values.name, values.description, values.sequence);
    window.alert('You have added a new sequence called '+ values.name);
  };

  /* this method is used for debugging */
  // showFormValues = async values => {
  //   const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  //   await sleep(500); // simulate server latency
  //   window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
  // };

  render() {
    return (
      <div>
        <UploadForm onSubmit={this.addNewSequence} />
     </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sequences: state.rootReducer.sequences
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addSequence: (name, description, sequence) => dispatch(addSequence(name, description, sequence)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewSequence)