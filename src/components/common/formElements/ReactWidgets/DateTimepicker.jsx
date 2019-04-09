import React from 'react';
import { Field } from 'redux-form';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import 'react-widgets/dist/css/react-widgets.css';

moment.locale('en');
momentLocalizer();

const renderDateTimePicker = ({
  input: { onChange, value },
  showTime,
  maxDate,
  minDate,
  disabled,
  meta: { touched, error },
  label
}) => {
  let dateObject;
  if (value && value.toString().indexOf('/') !== -1) {
    const array = value.split('/');
    const day = parseInt(array[0], 10);
    const month = parseInt(array[1], 10);
    const year = parseInt(array[2], 10);
    dateObject = new Date(year, month - 1, day);
  } else {
    dateObject = new Date(value);
  }
  return (
    <div>
      <label className="position-relative custom-label-date">
        {label}
      </label>
      <DateTimePicker
        onChange={onChange}
        format="DD/MM/YYYY"
        time={showTime}
        max={maxDate}
        min={minDate}
        value={!value ? undefined : dateObject}
        placeholder="DD/MM/YYYY"
        disabled={disabled}
      />
      {touched
      && error
      && (
        <small className="error">
          Date
          {error}
        </small>
      )}
    </div>
  );
};
const DateTimepicker = (props) => {
  const {
    name,
    showTime,
    validate,
    maxDate,
    minDate,
    disabled,
    label,
    onChange,
  } = props;
  return (
    <Field
      name={name}
      showTime={showTime}
      component={renderDateTimePicker}
      validate={validate}
      maxDate={maxDate}
      minDate={minDate}
      disabled={disabled}
      onChange={onChange}
      label={label}
    />
  );
};
export default DateTimepicker;
