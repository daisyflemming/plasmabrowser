import React from 'react';
import FileUpload from './FileUpload';
import JsonViewer from './JsonViewer';
import AreaPlotCrosshair from "../plots/AreaPlotCrosshair";
import {connect} from "react-redux";

const ImportSequences = (props) => {
  let {expressionCounts, expressionAnnotations} = props;
  return (
    <div className='container root'>
      <div className='row'>
        <div className={'col s8'}>
          <div className={'row'}>
            <FileUpload/>
          </div>
          {(!expressionCounts || !expressionAnnotations || expressionAnnotations.length === 0) ? null :

            <div className={'row'} id={'barPlot'}>
              <AreaPlotCrosshair/>
            </div>
          }
        </div>
        {(!expressionCounts || !expressionAnnotations || expressionAnnotations.length === 0) ? null :
          <div className={'col s4'}>
            <JsonViewer/>
          </div>
        }
      </div>
    </div>
    );
}

const mapStateToProps = (state, ownProps) => {
  return {
    expressionCounts: state.rootReducer.expressionCounts,
    expressionAnnotations: state.rootReducer.expressionAnnotations,
  }
};

export default connect(mapStateToProps)(ImportSequences);
