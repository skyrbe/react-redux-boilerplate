import React from 'react';
import { Field } from 'redux-form';
import cx from 'classnames';
import styles from './SelectBox.module.css';

const SelectBox = (props) => {
  const {
    name,
    errorLabel,
    defaultValue,
    options,
    defaultLabel,
    validate,
    onChange,
    label
  } = props;

  const renderSelectField = (
    {
      input,
      meta: { touched, error },
    }
  ) => (
    <div className="h-100">
      <div className="h-100">
        <select {...input} className={styles.formControl} value={input.value}>
          {defaultLabel
            && (
              <option disabled>
                {defaultLabel}
              </option>
            )
          }
          {options.map((el) => {
            return (
              <option value={el.value} key={el.value}>
                {el.name}
              </option>);
          })}
        </select>
      </div>
      {touched
        && error
        && (
          <small className={cx('error', styles.dropdownError, 'd-block', 'float-left')}>
            {errorLabel}
          </small>)}
    </div>
  );

  return (
    <div className={styles.selectContainer}>
      <label className={styles.selectLabel}>
        {label}
      </label>
      <Field
        name={name}
        component={renderSelectField}
        errorLabel={errorLabel}
        defaultValue={defaultValue}
        validate={validate}
        onChange={onChange}
        options={options}
        defaultLabel={defaultLabel}
      />
    </div>
  );
};
export default SelectBox;
