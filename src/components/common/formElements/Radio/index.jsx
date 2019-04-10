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
    disabled,
    options,
    externalLabel,
    customClass,
    customLabel
  } = props;
  const radioContainerClass = `custom-control custom-radio ${customClass}`;
  let requiredErrorLabel = label;
  if (customLabel) {
    requiredErrorLabel = customLabel;
  }
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
                  defaultChecked={defaultChecked}
                  disabled={disabled}
                  checked={props.input.checked}
                />
                <label className="text-muted custom-control-label mr-10" htmlFor={`${externalLabel}_${input.name}_${option.label}`}>
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
            {(error.trim() ? `${requiredErrorLabel} ${FormValidationMessages[props.language][error]}` : '') || errorLabel}
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

function mapStateToProps({ localization }) {
  return {
    language: localization.language
  };
}

const ConnectedRenderField = connect(mapStateToProps)(renderField);

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
    options,
    customLabel
  } = props;

  return (
    <div>
      { label && (
        <label className="text-muted radio-inline">
          {label}
        </label>)}
      <Field
        name={props.name}
        component={ConnectedRenderField}
        readOnly={readOnly}
        validate={validate}
        onChange={onChange}
        disabled={disabled}
        errorLabel={errorLabel}
        defaultChecked={defaultChecked}
        externalLabel={externalLabel}
        customClass={customClass}
        options={options}
        label={label}
        customLabel={customLabel}
      />
    </div>);
};
export default RadioGroup;
