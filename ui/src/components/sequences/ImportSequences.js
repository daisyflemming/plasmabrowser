import React from 'react';
import FileUpload from './FileUpload';
import AreaPlotCrosshair from "../plots/AreaPlotCrosshair";
import JsonViewer from "./JsonViewer";
import {connect} from "react-redux";
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import {create_UUID} from "../utils/commons";

const ImportSequences = (props) => {
  const {expressionCounts, expressionAnnotations, loading} = props;
  return (
    <div className='container'>
      <div className='row'>
            <FileUpload/>
      </div>

      <div className='row'>
        <div className={'loading-icon'}>
        {loading &&
          <img src={'images/Spinner-1s-200px.svg'}/>
        }
        </div>
      </div>

      {(!expressionCounts || !expressionAnnotations || expressionAnnotations.length === 0 || loading) ? null :
        <div className='row'>
          <div className={'col s8'}>
            <AreaPlotCrosshair key={'areaplot_'+create_UUID()} />
          </div>
          <div className={'col s4'}>
            <JsonViewer key={'jsonviewer_'+create_UUID()}/>
          </div>

        </div>
      }
    </div>
    );
}

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.rootReducer.loading,
    expressionCounts: state.rootReducer.expressionCounts,
    expressionAnnotations: state.rootReducer.expressionAnnotations,
  }
};

export default connect(mapStateToProps)(ImportSequences);
