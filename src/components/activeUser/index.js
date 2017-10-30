import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

let ActiveUserForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <div>
          <Field name="name" component="input" type="text" placeholder="Name"/>
        </div>
      </div>
      <div>
        <label>Location</label>
        <div>
          <Field name="location" component="input" type="text" placeholder="Location"/>
        </div>
      </div>

      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
ActiveUserForm = reduxForm({
  form: 'ActiveUserForm'  // a unique identifier for this form
})(ActiveUserForm)

// You have to connect() to any reducers that you wish to connect to yourself
ActiveUserForm = connect(
  state => ({
    initialValues: state.users.activeUser // pull initial values from account reducer
  }),
  {}               // bind account loading action creator
)(ActiveUserForm)

export default ActiveUserForm
