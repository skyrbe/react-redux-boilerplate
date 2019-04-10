import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import cn from 'classnames';
import FormValidationMessages from '@components/common/FormValidationMessages';
import styles from './file-upload.module.css';

const RenderFileUpload = (props) => {
  const {
    name,
    input,
    id,
    errorLabel,
    type,
    fileOnChange,
    accept,
    meta: {
      touched,
      error,
      warning,
    },
    uploadDirty,
    uploadDirtyMsg,
    disabled,
    buttonLabel,
    customLabelClass
  } = props;
  delete input.value;

  return (
    <Fragment>
      <div className={cn(styles.uploadBtnContainer, customLabelClass)}>
        <p>
          {buttonLabel}
        </p>
        <input
          {...input}
          className={cn(styles.uploadFile)}
          id={id}
          type={type}
          name={name}
          onChange={fileOnChange}
          disabled={disabled}
          accept={accept}
        />
      </div>
      {touched
        && ((error && (
          <small className="row m-0 p-0 error">
            {FormValidationMessages[props.language][error].trim() || errorLabel}
          </small>))
          || (warning && (
            <small className="error">
              {warning}
            </small>
          ))
        )
      }
      {uploadDirty === true && (
        <small className="row m-0 p-0 error">
          {errorLabel}
          {uploadDirtyMsg}
        </small>
      )}
    </Fragment>
  );
};

function mapStateToProps({ localization }) {
  return {
    language: localization.language
  };
}

const ConnectedRenderField = connect(mapStateToProps)(RenderFileUpload);

const ReactFileUpload = (props) => {
  const {
    name,
    id,
    errorLabel,
    label,
    fileOnChange,
    disabled,
    labelIconClass,
    customClass,
    accept,
    validate,
    uploadDirty,
    uploadDirtyMsg,
    buttonLabel,
    customLabelClass
  } = props;
  return (
    <Field
      name={name}
      id={id}
      type="file"
      component={ConnectedRenderField}
      label={label}
      errorLabel={errorLabel}
      customClass={customClass}
      fileOnChange={fileOnChange}
      labelIconClass={labelIconClass}
      disabled={disabled}
      accept={accept}
      validate={validate}
      uploadDirty={uploadDirty}
      uploadDirtyMsg={uploadDirtyMsg}
      buttonLabel={buttonLabel}
      customLabelClass={customLabelClass}
    />
  );
};

export default ReactFileUpload;
