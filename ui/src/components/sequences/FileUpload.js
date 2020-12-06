/*
 * This solution came from https://github.com/redux-form/redux-form/issues/3686
 */
import React from 'react'
import {Field, reduxForm} from 'redux-form';
import {post} from "axios";
import {addSequence} from "../../redux/actions/sequenceActions";
import {connect} from "react-redux";

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
  const { handleSubmit} = props;
  const onFormSubmit = (data) => {

    console.log(data);
    if (data instanceof String){
      alert(data)
    }
    const url = process.env.REACT_APP_UPLOAD_URL;

    // else a file is uploaded
    let formData = new FormData();
    formData.append('File', data.file);
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    };
    console.log(url);
    post(url, formData, config)
      .then(function(response) {
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
        window.alert(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className={'row field-block'}>
          <label className={'field-label'}>
            Upload a JSON file from your desktop
          </label>
          <div>
          <Field name='file' component={FileInput} type='file'/>
          </div>
        </div>

        <div>OR</div>

        <div className={'row field-block'}>
          <label className={'field-label'}>
            Enter a url of the JSON file
          </label>
          <div>
          <Field name='fileUrl' component='input' type='text'/>
          </div>
        </div>
        <div className='center'>
          <button type='submit' className="btn-small center small-margin-top pink accent-4">Submit</button>
        </div>
      </form>
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    tcga_sequences: state.rootReducer.sequences.map(a => a.sequence),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addSequence: (counts, annotations) => dispatch(addSequence(counts, annotations)),
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
