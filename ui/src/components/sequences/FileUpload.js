/*
 * This solution came from https://github.com/redux-form/redux-form/issues/3686
 */
import React from 'react'
import {Field, reduxForm} from 'redux-form';
import axios from "axios";
import {addSequence} from "../../redux/actions/sequenceActions";
import {connect} from "react-redux";
import {uploadFile} from "../../index";
import { toggleLoading } from '../../redux/actions/rootActions';

const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);
const FileInput = ({
                     input: { value: omitValue, onChange, onBlur, ...inputProps },
                     meta: omitMeta,
                     ...props
                   }) => {
  return (
    <input
      onChange={adaptFileEventToValue(onChange)}
      onBlur={adaptFileEventToValue(onBlur)}
      type="file"
      {...inputProps}
      {...props}
    />
  );
};

let FileUpload = (props) => {
  const { handleSubmit, toggleLoading} = props;
  const onFormSubmit = (data) => {
    toggleLoading();
    let formData = new FormData();
    formData.append('File', data.file);
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    };
    console.log(uploadFile);
    axios.post(uploadFile, formData, config)
      .then(function(response) {
        toggleLoading();
        let counts = response.data.counts;
        let annotations = response.data.annotations;
        if (counts){
          props.addSequence(counts, annotations)
        }
        else {
          window.alert('No counts are included in the file.');
        }
      })
      .catch(function(error) {
        toggleLoading();
        window.alert(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className={'upload-form-block'}>
          <label className={'field-label'}>
            Upload a JSON file from your desktop
          </label>
          <div>
          <Field name='file' component={FileInput} type='file' />
          </div>

        {/*<div>OR</div>*/}

        {/*<div className={'row field-block'}>*/}
        {/*  <label className={'field-label'}>*/}
        {/*    Enter a url of the JSON file*/}
        {/*  </label>*/}
        {/*  <div>*/}
        {/*  <Field name='fileUrl' component='input' type='text'/>*/}
        {/*  </div>*/}
        {/*</div>*/}

        <div className='left upload-file-button'>
          <button type='submit' className="btn-small left small-margin-top pink accent-4">Submit</button>
        </div>
        </div>
      </form>
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addSequence: (counts, annotations) => dispatch(addSequence(counts, annotations)),
    toggleLoading: () => dispatch(toggleLoading()),
  }
};

FileUpload = reduxForm({
  form: 'uploadSequencesForm' // a unique identifier for this form
})(FileUpload);

FileUpload = connect(
  mapStateToProps,
  mapDispatchToProps
)(FileUpload);

export default FileUpload
