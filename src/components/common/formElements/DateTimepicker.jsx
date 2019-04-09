import React from 'react';
import { Field } from 'redux-form';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import 'react-widgets/dist/css/react-widgets.css';

moment.locale('en');
momentLocalizer();
const renderDateTimePicker = ({ input: { onChange, value }, showTime }) => (
  <DateTimePicker
    onChange={onChange}
    format="DD MMM YYYY"
    time={showTime}
    value={!value ? null : new Date(value)}
    placeholder="DD/MM/YYYY"
  />
);
const DateTimepicker = props => {
  const { name, showTime, dateLabel } = props;
  return (
    <div>
      <label className="pos-a custom-label-date">{dateLabel}</label>
      <Field name={name} showTime={showTime} component={renderDateTimePicker} />
    </div>
  );
};
export default DateTimepicker;
