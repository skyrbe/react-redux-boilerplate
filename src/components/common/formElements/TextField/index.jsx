import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import cn from 'classnames';
import FormValidationMessages from '@components/common/FormValidationMessages';
import styles from './TextField.module.css';

class renderField extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const {
      input,
      errorLabel,
      label,
      type,
      readOnly,
      maxLength,
      meta: { touched, error, warning },
      customClass,
      autocomplete,
      placeholder,
      labelIconClass,
      normalize,
      customLabelCss,
      hasNoStartingSpace,
      errorLabelCustomClass,
    } = this.props;

    let fieldClass = `form-control form-control-danger ${styles.inputField}`;
    if (customClass) {
      fieldClass = `${fieldClass} ${customClass}`;
    }
    let requiredErrorLabel = label;
    if (label) {
      requiredErrorLabel = requiredErrorLabel.replace(/\*/gi, '');
    }
    return (
      <Fragment>
        <label className={cn(styles.customLabel, customLabelCss)}>
          {labelIconClass && <i className={cn('mr-10', labelIconClass)} />}
          {label}
        </label>
        <input
          className={fieldClass}
          autoComplete={autocomplete}
          {...input}
          maxLength={maxLength}
          type={type}
          value={hasNoStartingSpace ? input.value.trimStart() : input.value}
          placeholder={placeholder}
          readOnly={readOnly}
          onFocus={() => input.onFocus()}
          onBlur={() => input.onBlur()}
          normalize={normalize}
        />
        <small className="text-muted" htmlFor={input.name} />
        {touched
          && ((error && (
            <small className={cn('error', errorLabelCustomClass)}>
              {(error.trim() ? `${requiredErrorLabel} ${FormValidationMessages[this.props.language][error]}` : '') || errorLabel}
            </small>))
            || (warning && (
            <small className="error">
              {warning}
            </small>
            )))}
      </Fragment>
    );
  }
}

function mapStateToProps({ localization }) {
  return {
    language: localization.language
  };
}

const ConnectedRenderField = connect(mapStateToProps)(renderField);

const Textfield = (props) => {
  const {
    name,
    type,
    errorLabel,
    label,
    readOnly,
    maxLength,
    validate,
    customClass,
    autocomplete,
    onChange,
    labelIconClass,
    placeholder,
    normalize,
    customLabelCss,
    onBlur,
    hasNoStartingSpace,
    errorLabelCustomClass
  } = props;
  return (
    <Field
      name={name}
      type={type}
      readOnly={readOnly}
      maxLength={maxLength}
      component={ConnectedRenderField}
      label={label}
      errorLabel={errorLabel}
      validate={validate}
      customClass={customClass}
      autocomplete={autocomplete}
      onChange={onChange}
      placeholder={placeholder}
      labelIconClass={labelIconClass}
      normalize={normalize}
      customLabelCss={customLabelCss}
      onBlur={onBlur}
      hasNoStartingSpace={hasNoStartingSpace}
      errorLabelCustomClass={errorLabelCustomClass}
    />
  );
};

export default Textfield;
