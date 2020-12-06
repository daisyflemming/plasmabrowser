import React from 'react';
import FileUploadComponent from './FileUpload';
import JsonViewer from './JsonViewer';
import ScatterPlot from "../plots/ScatterPlot";

class ImportSequences extends React.Component {
  render() {
    return (
      <div className='container root'>
        <div className='row root'>
          <div className={'col s8'}>
            <div className={'row'}>
              <FileUploadComponent/>
            </div>
            <div className={'row'}>
              <ScatterPlot/>
            </div>
          </div>
          <div className={'col s4'}>
            <JsonViewer/>
          </div>
        </div>
      </div>
    );
  }
}

export default ImportSequences