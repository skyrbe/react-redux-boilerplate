import React, { Component } from 'react';
import { Field } from 'redux-form';

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
      textarea,
      errorLabel,
      label,
      name,
      type,
      readOnly,
      maxLength,
      meta: {
        touched,
        error,
        warning
      },
      customClass,
      disabled
    } = this.props;

    let fieldClass = 'form-control form-control-danger';
    if (customClass) {
      fieldClass = `${fieldClass} ${customClass}`;
    }
    return (
      <div className={this.state.focused || input.value !== '' ? 'pos-r input-focused' : 'pos-r input-blur'}>
        <label className="pos-a custom-label custom-label-comment">
          {label}
        </label>
        <textarea
          {...input}
          name={name}
          type={type}
          maxLength={maxLength}
          className={fieldClass}
          readOnly={readOnly}
          disabled={disabled}
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
    value,
    onChange,
    disabled
  } = props;
  return (
    <div>
      <Field
        name={name}
        type={type}
        value={value}
        readOnly={readOnly}
        maxLength={maxLength}
        component={renderField}
        label={label}
        errorLabel={errorLabel}
        validate={validate}
        customClass={customClass}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

export default Textfield;
