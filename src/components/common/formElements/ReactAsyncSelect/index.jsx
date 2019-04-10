import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import AsyncSelect from 'react-select/lib/Async';
import { components } from 'react-select';
import cn from 'classnames';
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable';
import FormValidationMessages from '@components/common/FormValidationMessages';
import styles from '@formElements/TextField/TextField.module.css';
import selectStyles from './reactAsyncSelect.module.css';

let maxLengthOfEl = 500;

const Option = (props) => {
  return (
    <div className={cn(selectStyles.selectedOptions, (props.isFocused ? `${selectStyles.focusedOption} full-width d-block` : selectStyles.notFocusedOption))} {...props.innerProps}>
      {props.data.label}
      { props.isFocused && props.data.optionInfo && (
        <div className="fs-10">
          { props.data.optionInfo }
        </div>
      )}
    </div>
  );
};
/* default styles */
const customStyles = {
  input: provided => ({
    ...provided,
    wordBreak: 'break-all',
  }),
  control: provided => ({
    ...provided,
    minHeight: '50px',
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#FFF',
    borderColor: '#dbd9d8',
    color: '#222',
  }),
  indicatorSeparator: provided => ({
    ...provided,
    marginTop: '0',
    marginBottom: '0',
  }),
  dropdownIndicator: provided => ({
    ...provided,
    padding: '4px',
  }),
  valueContainer: provided => ({
    ...provided,
    flexWrap: 'nowrap !important'
  })
};
let dropdownIndicatorClassList = 'fa fa-search mr-10';
/* end default styles */
/* rounded react async select styles */
const roundedStyles = { ...customStyles };
roundedStyles.control = provided => ({
  ...provided,
  height: '55px',
  borderRadius: '27px',
  border: '1px solid #f3f3f3',
  backgroundColor: '#f7f7f7',
});
roundedStyles.input = provided => ({
  ...provided,
  wordBreak: 'break-all',
  color: '#68696b',
  fontFamily: 'Gotham-Book',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '14.4px',
});
/* end rounded react async select styles */

// maxLength can be defined for creatable options
const MaxLengthInput = (props) => {
  return (
    <components.Input {...props} maxLength={maxLengthOfEl} />
  );
};

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
    labelIconClass,
    label,
    maxLength,
    customLabelCss,
    meta: { touched, error, warning },
    errorLabel,
    errorLabelCustomClass,
    rounded
  } = props;
  maxLengthOfEl = maxLength;
  let requiredErrorLabel = label;
  if (label) {
    requiredErrorLabel = requiredErrorLabel.replace(/\*/gi, '');
  }
  dropdownIndicatorClassList = rounded ? dropdownIndicatorClassList.concat(' fs-22') : dropdownIndicatorClassList;


  return (
    <div>
      {label && (
      <label className={cn(styles.customLabel, customLabelCss)}>
        {labelIconClass && <i className={cn('mr-10', labelIconClass)} />}
        {label}
      </label>
      )}
      {isCreatable ? (
        <AsyncCreatableSelect
          {...input}
          name={name}
          cacheOptions={cacheOptions}
          defaultOptions={defaultOptions}
          loadOptions={loadOptions}
          isDisabled={isDisabled}
          isSearchable={isSearchable}
          placeholder={placeholder}
          className={className}
          styles={customStyles}
          isMulti={isMulti}
          options={options}
          id={id}
          maxLength={maxLength}
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator: () => <span className={dropdownIndicatorClassList} />,
            Input: MaxLengthInput
          }}
        />
      ) : (
        <AsyncSelect
          {...input}
          name={name}
          cacheOptions={cacheOptions}
          defaultOptions={defaultOptions}
          loadOptions={loadOptions}
          isDisabled={isDisabled}
          isSearchable={isSearchable}
          placeholder={placeholder}
          className={className}
          isMulti={isMulti}
          options={options}
          styles={rounded ? roundedStyles : customStyles}
          maxLength={maxLength}
          id={id}
          onBlur={() => input.onBlur()}
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator: () => <span className={dropdownIndicatorClassList} />,
            Input: MaxLengthInput,
            Option
          }}
        />
      )}
      {touched
        && ((error && (
          <small className={cn('error', errorLabelCustomClass)}>
            {(error.trim() ? `${requiredErrorLabel} ${FormValidationMessages[props.language][error]}` : '') || errorLabel}
          </small>))
          || (warning && (
          <small className="error">
            {warning}
          </small>
          )))}
    </div>
  );
};

function mapStateToProps({ localization }) {
  return {
    language: localization.language
  };
}

const ConnectedRenderField = connect(mapStateToProps)(RenderSelectInput);

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
    errorLabel,
    labelIconClass,
    label,
    maxLength,
    customLabelCss,
    rounded = false
  } = props;
  return (
    <div>
      <Field
        name={name}
        component={ConnectedRenderField}
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
        labelIconClass={labelIconClass}
        label={label}
        maxLength={maxLength}
        customLabelCss={customLabelCss}
        rounded={rounded}
      />
    </div>
  );
};
export default ReactAsyncSelect;
