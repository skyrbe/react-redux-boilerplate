import React from 'react';
import { Field } from 'redux-form';
import Select from 'react-select';

const RenderSelectInput = (props) => {
  const {
    input,
    name,
    id,
    options,
    placeholder,
    isMulti,
    isDisabled,
    isSearchable,
    className,
    meta: {
      touched,
      error,
      warning
    },
    errorLabel
  } = props;
  return (
    <div>
      <Select {...input} name={name} isDisabled={isDisabled} isSearchable={isSearchable} placeholder={placeholder} className={className} isMulti={isMulti} options={options} id={id} onBlur={() => input.onBlur(input.value)} />
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
  );
};

const ReactSelect = (props) => {
  const {
    name,
    id,
    options,
    onChange,
    placeholder,
    isMulti,
    isDisabled,
    isSearchable,
    className,
    validate,
    errorLabel
  } = props;
  return (
    <div>
      <Field
        name={name}
        component={RenderSelectInput}
        id={id}
        options={options}
        onChange={onChange}
        placeholder={placeholder}
        isMulti={isMulti}
        isDisabled={isDisabled}
        isSearchable={isSearchable}
        className={className}
        validate={validate}
        errorLabel={errorLabel}
      />
    </div>
  );
};
export default ReactSelect;
