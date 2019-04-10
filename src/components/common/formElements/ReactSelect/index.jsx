import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import Select from 'react-select';
import cn from 'classnames';
import styles from '@formElements/TextField/TextField.module.css';
import FormValidationMessages from '@components/common/FormValidationMessages';
import selectStyles from './reactSelect.module.css';

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

const RenderSelectInput = (props) => {
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
  };

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
    label,
    displayLabel,
    meta: { touched, error, warning },
    errorLabel,
    errorLabelCustomClass,
    labelIconClass,
    customLabelCss
  } = props;

  let requiredErrorLabel = label;
  if (label) {
    requiredErrorLabel = requiredErrorLabel.replace(/\*/gi, '');
  }

  return (
    <div>
      {displayLabel !== false && (
        <label className={cn(styles.customLabel, customLabelCss)}>
          {labelIconClass && <i className={cn('mr-10', labelIconClass)} />}
          {label}
        </label>
      )}
      <Select
        {...input}
        name={name}
        isDisabled={isDisabled}
        isSearchable={isSearchable}
        placeholder={placeholder}
        className={className}
        isMulti={isMulti}
        options={options}
        id={id}
        styles={customStyles}
        onBlur={() => input.onBlur(input.value)}
        components={{
          IndicatorSeparator: () => null,
          DropdownIndicator: () => <span className="fa fa-caret-down mr-10" />,
          Option
        }}
      />
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
    label,
    errorLabel,
    displayLabel,
    customLabelCss
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
        validate={validate}
        label={label}
        errorLabel={errorLabel}
        displayLabel={displayLabel}
        customLabelCss={customLabelCss}
      />
    </div>
  );
};
export default ReactSelect;
