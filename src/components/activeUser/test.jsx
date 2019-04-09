import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Radio from '@formElements/Radio';

let TestForm = (props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Radio
        name="action"
        label="Approve"
        value="1"
        externalLabel={`Approve${props.form}`}
      />
      <Radio
        name="action"
        label="Reject"
        value="2"
        externalLabel={`Reject${props.form}`}
      />
    </form>
  );
};

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
TestForm = reduxForm({
  form: 'TestForm' // a unique identifier for this form
})(TestForm);

// You have to connect() to any reducers that you wish to connect to yourself
TestForm = connect(
  state => ({
    initialValues: state.users.activeUser // pull initial values from account reducer
  }),
  {} // bind account loading action creator
)(TestForm);

export default TestForm;
