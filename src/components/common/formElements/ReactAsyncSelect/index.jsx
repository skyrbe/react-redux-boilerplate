import React from 'react';
import { Field } from 'redux-form';
import AsyncSelect from 'react-select/lib/Async';
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable';

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
    cacheOptions,
    loadOptions,
    defaultOptions,
    isCreatable,
    meta: {
      touched,
      error,
      warning
    },
    errorLabel
  } = props;
  return (
    <div>
      { isCreatable ? <AsyncCreatableSelect {...input} name={name} cacheOptions={cacheOptions} defaultOptions={defaultOptions} loadOptions={loadOptions} isDisabled={isDisabled} isSearchable={isSearchable} placeholder={placeholder} className={className} isMulti={isMulti} options={options} id={id} onBlur={() => input.onBlur(input.value)} /> : <AsyncSelect {...input} name={name} cacheOptions={cacheOptions} defaultOptions={defaultOptions} loadOptions={loadOptions} isDisabled={isDisabled} isSearchable={isSearchable} placeholder={placeholder} className={className} isMulti={isMulti} options={options} id={id} onBlur={() => input.onBlur(input.value)} />}
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

const ReactAsyncSelect = (props) => {
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
    cacheOptions,
    loadOptions,
    defaultOptions,
    isCreatable,
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
        cacheOptions={cacheOptions}
        loadOptions={loadOptions}
        defaultOptions={defaultOptions}
        isCreatable={isCreatable}
        validate={validate}
        errorLabel={errorLabel}
      />
    </div>
  );
};
export default ReactAsyncSelect;
