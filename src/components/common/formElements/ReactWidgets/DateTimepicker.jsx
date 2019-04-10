import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
// import dateFnsLocalizer from 'react-widgets-date-fns';
import 'react-widgets/dist/css/react-widgets.css';
import FormValidationMessages from '@components/common/FormValidationMessages';
import * as availableLanguages from '@localization';

moment.locale('en');
momentLocalizer();
// dateFnsLocalizer();

const renderDateTimePicker = ({
  input: { onChange, value },
  showTime,
  maxDate,
  minDate,
  disabled,
  meta: { touched, error },
  label,
  language
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
  const CONSTANTS = availableLanguages[language];
  return (
    <Fragment>
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
        && error && (
          <small className="error">
            {CONSTANTS.DATE}
            {FormValidationMessages[language][error]}
          </small>
      )}
    </Fragment>
  );
};

function mapStateToProps({ localization }) {
  return {
    language: localization.language
  };
}

const ConnectedRenderField = connect(mapStateToProps)(renderDateTimePicker);

const DateTimepicker = (props) => {
  const {
    name, showTime, validate, maxDate, minDate, disabled, label, onChange
  } = props;
  return (
    <Field
      name={name}
      showTime={showTime}
      component={ConnectedRenderField}
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
