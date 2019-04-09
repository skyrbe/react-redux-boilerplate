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
    disabled,
    options,
    externalLabel,
    customClass
  } = props;
  const radioContainerClass = `custom-control custom-radio ${customClass}`;
  return (
    <Fragment>
      <div className="row m-0">
        {
          options.map((option) => {
            return (
              <div className={radioContainerClass} key={`${externalLabel}_${input.name}_${option.label}`}>
                <input
                  {...input}
                  className="custom-control-input"
                  type="radio"
                  value={option.value}
                  readOnly={readOnly}
                  id={`${externalLabel}_${input.name}_${option.label}`}
                  checked={option.value === input.value}
                  defaultChecked={defaultChecked}
                  disabled={disabled}
                />
                <label className="text-muted custom-control-label" htmlFor={`${externalLabel}_${input.name}_${option.label}`}>
                  {option.label}
                </label>
              </div>
            );
          })
        }
      </div>
      {touched
        && ((error && (
          <small className="row m-0 p-0 error">
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
    </Fragment>
  );
};

export const RadioGroup = (props) => {
  console.log(props);
  const {
    readOnly,
    validate,
    onChange,
    externalLabel,
    disabled,
    customClass,
    errorLabel,
    label,
    defaultChecked,
    options
  } = props;

  return (
    <div>
      <label className="text-muted radio-inline">
        {label}
      </label>
      <Field
        name={props.name}
        component={renderField}
        readOnly={readOnly}
        validate={validate}
        onChange={onChange}
        disabled={disabled}
        errorLabel={errorLabel}
        defaultChecked={defaultChecked}
        externalLabel={externalLabel}
        customClass={customClass}
        options={options}
      />
    </div>);
};
export default RadioGroup;
