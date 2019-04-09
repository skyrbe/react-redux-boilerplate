import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Textfield from '@formElements/TextField';
import Textarea from '@formElements/TextArea';
import RadioGroup from '@formElements/Radio';
import SelectBox from '@formElements/SelectBox';
import Checkbox from '@formElements/Checkbox';
import DateTimepicker from '@formElements/ReactWidgets/DateTimepicker';
import ReduxRange from '@formElements/ReduxRange';
import ReactSelect from '@formElements/ReactSelect';
import ReactAsyncSelect from '@formElements/ReactAsyncSelect';
import {
  required,
  requiredReactSelect
} from '@components/common/FormValidation';
import cn from 'classnames';
import styles from './active-user.module.css';

const changeHandler = (e) => {
  console.log('event ', e);
};

const handleChange = (selectedOption) => {
  console.log('Option selected:', selectedOption);
};

let ActiveUserForm = (props) => {
  const {
    handleSubmit,
  } = props;

  const radioArray = [
    {
      label: '1-13',
      value: '1',
    },
    {
      label: '14-18',
      value: '2',
    },
    {
      label: '18-23',
      value: '3',
    },
    {
      label: '>23',
      value: '4',
    },
  ];
  const selectArray = [
    {
      name: '10-25 lac',
      value: '1',
    },
    {
      name: '25 lacs-1 cr',
      value: '2',
    },
    {
      name: 'More than 1 cr',
      value: '3',
    },
  ];

  const options = [
    {
      label: '1-13',
      value: '1',
    },
    {
      label: '14-18',
      value: '2',
    },
    {
      label: '18-23',
      value: '3',
    },
    {
      label: '>23',
      value: '4',
    },
  ];

  const rangeProps = {
    defaultValue: [2020, 2040],
    marks: {
      2020: '2020',
      2030: '2030',
      2040: '2040',
      2050: '2050',
      2060: '2060',
      2070: '2070',
      2080: '2080',
    },
    pushable: true,
    allowCross: false,
    min: 2018,
    max: 2080,
    step: 1,
  };


  const loadOptions = (inputValue, callback) => {
    props.onSearchOption(inputValue, callback);
  };

  return (
    <div className="row justify-content-md-center h-100">
      <div className={cn(styles.width400, 'card fat ')}>
        <div className="card-body">
          <h4 className="h4">
            User Info
          </h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <ReactAsyncSelect
                name="async"
                id="asyEX"
                placeholder="multi async"
                errorLabel="Async field"
                cacheOptions
                loadOptions={loadOptions}
                defaultOptions={props.options}
                validate={[requiredReactSelect]}
                isMulti
                isCreatable
              />
            </div>
            <div className="form-group">
              <ReactSelect
                name="multi"
                options={options}
                id="multiEX"
                onChange={handleChange}
                validate={[requiredReactSelect]}
                errorLabel="Field"
                placeholder="multi select"
                className=""
                isMulti
              />
            </div>
            <div className="form-group">
              <ReactSelect
                name="search"
                options={options}
                id="searchEX"
                onChange={handleChange}
                validate={[requiredReactSelect]}
                errorLabel="Field"
                placeholder="search here"
                className=""
                isMulti
                isSearchable
              />
            </div>
            <div className="form-group">
              <ReactSelect
                name="disable"
                options={options}
                id="disableEX"
                onChange={handleChange}
                placeholder="disable"
                className=""
                isDisabled
              />
            </div>
            <div className="form-group">
              <DateTimepicker
                name="date"
                label="Date"
                dateLabel="Date"
                showTime={false}
                maxDate={new Date()}
                validate={required}
              />
            </div>
            <div className="form-group">
              <Textfield
                name="name"
                type="text"
                maxLength="10"
                label="Enter Name"
                errorLabel="Name "
                validate={[required]}
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <Textarea
                name="location"
                label="Enter Location"
                errorLabel="Location "
                validate={[required]}
              />
            </div>
            <div className="form-group">
              <SelectBox
                name="annualIncome"
                errorLabel="Annual income is required"
                validate={[required]}
                options={selectArray}
                defaultLabel="Please select an option"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <Checkbox
                name="agree"
                type="checkbox"
                label="I agree to terms and conditions"
                errorLabel="I agree to terms and conditions "
                validate={required}
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <RadioGroup
                options={radioArray}
                name="age"
                label="select your age"
                validate={[required]}
                errorLabel="Age "
                externalLabel={`Guest${props.form}`}
                customClass="col-4"
              />
            </div>
            <div className="form-group">
              <ReduxRange name="yearRange" props={rangeProps} />
            </div>
            <div className="form-group">
              <button className="btn btn-primary float-right" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
ActiveUserForm = reduxForm({
  form: 'ActiveUserForm', // a unique identifier for this form
})(ActiveUserForm);

// You have to connect() to any reducers that you wish to connect to yourself
ActiveUserForm = connect(
  state => ({
    initialValues: state.users.activeUser, // pull initial values from account reducer
  }),
  {} // bind account loading action creator
)(ActiveUserForm);

export default ActiveUserForm;
