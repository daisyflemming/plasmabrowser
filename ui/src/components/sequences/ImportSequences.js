import React from 'react';
import FileUploadComponent from './FileUpload';
import JsonViewer from './JsonViewer';

class ImportSequences extends React.Component {
  render() {
    return (
      <div className='container root'>
        <div className='row root'>
          <div className={'col s6'}>
            <FileUploadComponent />
          </div>
          <div className={'col s6'}>
            <JsonViewer/>
          </div>
        </div>
      </div>
    );
  }
}

export default ImportSequences