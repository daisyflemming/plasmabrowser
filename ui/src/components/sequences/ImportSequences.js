import React from 'react';
import FileUpload from './FileUpload';
import JsonViewer from './JsonViewer';
import AreaPlotCrosshair from "../plots/AreaPlotCrosshair";
import {connect} from "react-redux";
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const ImportSequences = (props) => {
  const {expressionCounts, expressionAnnotations, loading} = props;
  return (
    <div className='container root'>
      <div className='row'>
        <div className={'col s8'}>
          <div className={'row'}>
            <FileUpload/>
          </div>
          {(!expressionCounts || !expressionAnnotations || expressionAnnotations.length === 0) ? null :
            <div className={'row'} id={'barPlot'}>
              {loading &&
              <div className={'loading-icon'}>
                <Loader type="Bars" color="#f50057" height="64" width="64"/>
              </div>
              }
              {!loading && <AreaPlotCrosshair/>}

            </div>
          }
        </div>
        {(!expressionCounts || !expressionAnnotations || expressionAnnotations.length === 0) ? null :
          <div className={'col s4'}>

            {loading &&
            <div className={'loading-icon'}>
              <Loader type="Bars" color="#f50057" height="64" width="64"/>
            </div>
            }
            {!loading && <JsonViewer/>}

          </div>
        }
      </div>
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
