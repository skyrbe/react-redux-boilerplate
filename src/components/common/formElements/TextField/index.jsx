import React, { Component } from 'react';
import { Field } from 'redux-form';
import cx from 'classnames';
import styles from './TextField.module.css';

// Textfield
class renderField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false
    };
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onFocus() {
    this.setState({
      focused: true
    });
  }

  onBlur() {
    this.setState({
      focused: false
    });
  }

  render() {
    const {
      input,
      errorLabel,
      label,
      type,
      readOnly,
      maxLength,
      meta: {
        touched,
        error,
        warning
      },
      customClass,
      autocomplete
    } = this.props;

    let fieldClass = `form-control form-control-danger ${styles.inputField}`;
    if (customClass) {
      fieldClass = `${fieldClass} ${customClass}`;
    }
    const inputContainerClass = this.state.focused || input.value !== '' ? styles.inputFocused : styles.inputBlur;
    const labelClass = this.state.focused || input.value !== '' ? styles.labelFocused : styles.labelBlur;

    return (
      <div className={inputContainerClass}>
        <label className={cx(labelClass, styles.customLabel)}>
          {label}
        </label>
        <input
          className={fieldClass}
          autoComplete={autocomplete}
          {...input}
          maxLength={maxLength}
          type={type}
          readOnly={readOnly}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
        <small
          className="text-muted"
          htmlFor={input.name}
        />
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
  }
}

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
    onChange
  } = props;
  return (
    <div>
      <Field
        name={name}
        type={type}
        readOnly={readOnly}
        maxLength={maxLength}
        component={renderField}
        label={label}
        errorLabel={errorLabel}
        validate={validate}
        customClass={customClass}
        autocomplete={autocomplete}
        onChange={onChange}
      />
    </div>
  );
};

export default Textfield;
