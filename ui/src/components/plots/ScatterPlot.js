import React, {Component} from 'react';
import {connect} from 'react-redux';
import {create_UUID} from "../utils/commons";

class ScatterPlot extends Component {
    render() {
      let {expressionCounts, expressionAnnotations} = this.props;
      return(
        <div></div>
      );
    }
};


const mapStateToProps = (state, ownProps) => {
  return {
    expressionCounts: state.rootReducer.expressionCounts,
    expressionAnnotations: state.rootReducer.expressionAnnotations,
  }
};

export default connect(mapStateToProps)(ScatterPlot);

