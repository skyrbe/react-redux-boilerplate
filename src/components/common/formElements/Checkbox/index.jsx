import React, { Fragment } from 'react';
import { Field } from 'redux-form';

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
    type
  } = props;

  return (
    <Fragment>
      <div className="custom-control custom-checkbox">
        <input
          className="custom-control-input"
          {...input}
          type={type}
          readOnly={readOnly}
          id={uniqueId}
          defaultChecked={defaultChecked}
          disabled={disabled}
        />
        <label className="text-muted custom-control-label" htmlFor={uniqueId}>
          {label}
        </label>
        {touched
          && ((error && (
            <small className="error">
              {errorLabel}
              {error}
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
    disabled
  } = props;
  return (
    <div>
      <Field
        name={name}
        type="checkbox"
        value={value}
        readOnly={readOnly}
        component={renderField}
        label={label}
        errorLabel={errorLabel}
        validate={validate}
        customClass={customClass}
        uniqueId={`${externalLabel}_${name}_${label}`}
        defaultChecked={defaultChecked}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};
export default Textfield;
