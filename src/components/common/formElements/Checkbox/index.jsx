import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import FormValidationMessages from '@components/common/FormValidationMessages';

const renderField = (props) => {
  const {
    input,
    errorLabel,
    label,
    readOnly,
    meta: {
      touched,
      error,
      warning
    },
    defaultChecked,
    uniqueId,
    disabled,
    type,
    customClass,
    customLabelClass
  } = props;
  let fieldClass = 'custom-control custom-checkbox ';
  if (customClass) {
    fieldClass = `${fieldClass} ${customClass}`;
  }

  let labelClass = 'text-muted custom-control-label';
  if (customLabelClass) {
    labelClass = `${labelClass} ${customLabelClass}`;
  }

  return (
    <Fragment>
      <div className={fieldClass}>
        <input
          className="custom-control-input"
          {...input}
          type={type}
          readOnly={readOnly}
          id={uniqueId}
          defaultChecked={defaultChecked}
          disabled={disabled}
        />
        <label className={labelClass} htmlFor={uniqueId}>
          {label}
        </label>
        {touched
          && ((error && (
            <small className="error">
              {(error.trim() ? `${label} ${FormValidationMessages[props.language][error]}` : '') || errorLabel}
            </small>))
            || (warning && (
              <small className="error">
                {warning}
              </small>
            ))
          )
        }
      </div>
    </Fragment>
  );
};

function mapStateToProps({ localization }) {
  return {
    language: localization.language
  };
}

const ConnectedRenderField = connect(mapStateToProps)(renderField);

const Textfield = (props) => {
  const {
    name,
    errorLabel,
    label,
    readOnly,
    validate,
    customClass,
    value,
    defaultChecked,
    onChange,
    externalLabel,
    disabled,
    customLabelClass
  } = props;
  return (
    <div>
      <Field
        name={name}
        type="checkbox"
        value={value}
        readOnly={readOnly}
        component={ConnectedRenderField}
        label={label}
        errorLabel={errorLabel}
        validate={validate}
        customClass={customClass}
        uniqueId={`${externalLabel}_${name}_${label}`}
        defaultChecked={defaultChecked}
        onChange={onChange}
        disabled={disabled}
        customLabelClass={customLabelClass}
      />
    </div>
  );
};
export default Textfield;
