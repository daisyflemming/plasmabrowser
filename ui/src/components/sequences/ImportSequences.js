import React from 'react';
import FileUploadComponent from './FileUpload';
import JsonViewer from './JsonViewer';
import AreaPlotCrosshair from "../plots/AreaPlotCrosshair";
import BarPlotZoom from "../plots/BarPlotZoom";

class ImportSequences extends React.Component {
  render() {
    return (
      <div className='container root'>
        <div className='row'>
          <div className={'col s8'}>
            <div className={'row'}>
              <FileUploadComponent/>
            </div>
            <div className={'row'} id={'barPlot'}>
              <AreaPlotCrosshair/>
            </div>
            <div className={'row'} id={'barPlot'}>
              <BarPlotZoom/>
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