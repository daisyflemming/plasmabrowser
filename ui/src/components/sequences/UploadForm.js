import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required'
  }
  if (!values.description) {
    errors.description = 'Required'
  }
  if (!values.sequence) {
    errors.sequence = 'Required'
  }
  else if (!/^[TCGA]*$/.test(values.sequence)) {
    errors.sequence = 'Sequence should only contains T, C, G, or A character ' +
      ' and no white space should be included.'
  }
  else if (values.tcga_sequences && values.sequence && values.tcga_sequences.includes(values.sequence)) {
    errors.sequence = 'The imported sequence is already in the system.'
  }
  return errors
};

const renderField = ({
                       input,
                       placeholder,
                       type,
                       meta: {touched, error, warning}
                     }) => (
  <div className={'form-input'}>
    {type === 'textarea' ?(
      <textarea {...input} placeholder={placeholder} className={'large-box'}/>
    ):(
      <input {...input} placeholder={placeholder} type={type} />
    )
    }
    {touched &&
    ((error && <span className={'required'}><i className="material-icons icon-red darken-4">error</i> {error} </span>) ||
      (warning && <span className={'required'}>{warning}</span>))}
  </div>
);

let UploadForm = props => {
  const {pristine, reset, submitting, invalid, handleSubmit} = props;
  return (
    <div className={'container'}>
      <h3>Add a new DNA sequence</h3>
      <form onSubmit={ values => {handleSubmit(values); reset()} }>
        <Field name='name' component={renderField} placeholder='Sequence name'
               type="text"/>
        <Field name='description' component={renderField} placeholder='Sequence Description'
               type="text"/>
        <Field name='sequence' component={renderField} placeholder='DNA Sequence'
               type="textarea" />
        <button type='submit' disabled={submitting || invalid}
                className={'btn-small indigo button-margin'} >
          <i className="material-icons left">add</i>Add Sequence
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}
                className={'btn-small indigo'}>
          Clear Values
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    // extract all TCGA sequence from existing list
    initialValues: {
      tcga_sequences: state.rootReducer.sequences.map(a => a.sequence),
    }
  }
};

UploadForm = reduxForm({
  form: 'uploadSequenceForm', validate,
  enableReinitialize: true
})(UploadForm);

UploadForm = connect(
  mapStateToProps
)(UploadForm);

export default UploadForm
