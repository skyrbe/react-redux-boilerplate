import React, { Component } from 'react';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import cn from 'classnames';
import FormValidationMessages from '@components/common/FormValidationMessages';
import styles from '@formElements/TextField/TextField.module.css';

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
      placeholder,
      maxLength,
      meta: {
        touched,
        error,
        warning
      },
      customClass,
      disabled,
      rows,
      autoFocus,
      normalize,
      customLabelCss
    } = this.props;

    let requiredErrorLabel = label;
    if (label) {
      requiredErrorLabel = requiredErrorLabel.replace(/\*/gi, '');
    }

    let fieldClass = 'form-control form-control-danger';
    if (customClass) {
      fieldClass = `${fieldClass} ${customClass}`;
    }
    return (
      <div className={this.state.focused || input.value !== '' ? 'pos-r input-focused' : 'pos-r input-blur'}>
        <label className={cn(styles.customLabel, customLabelCss)}>
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
          placeholder={placeholder}
          rows={rows}
          autoFocus={autoFocus}
          normalize={normalize}
        />
        {touched
          && ((error && (
            <small className="error">
              {(error.trim() ? `${requiredErrorLabel} ${FormValidationMessages[this.props.language][error]}` : '') || errorLabel}
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
    value,
    onChange,
    disabled,
    placeholder,
    rows,
    autoFocus,
    normalize,
    customLabelCss,
  } = props;
  return (
    <div>
      <Field
        name={name}
        type={type}
        value={value}
        readOnly={readOnly}
        maxLength={maxLength}
        component={ConnectedRenderField}
        label={label}
        errorLabel={errorLabel}
        validate={validate}
        customClass={customClass}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        rows={rows}
        autoFocus={autoFocus}
        normalize={normalize}
        customLabelCss={customLabelCss}
      />
    </div>
  );
};

export default Textfield;
