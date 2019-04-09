import React from 'react';
import { reduxForm } from 'redux-form';
import {
  required,
  number,
  email,
  password,
  mobileNumber,
  userFullName,
} from '@components/common/FormValidation';
import Checkbox from '@formElements/Checkbox';
import Banner from '@components/common/Banner';
import Textfield from '@formElements/TextField';
import InitialImage from '@assets/images/company.png';

const RegistrationForm = (props) => {
  const { handleSubmit, submitting } = props;
  return (
    <div className="row m-0 justify-content-md-center h-100">
      <div className="card-wrapper">
        <Banner
          icon={`<img src=${InitialImage} alt="company logo" width="130"/>`}
          title="Financial freedom, a sign up away."
          subheader="Welcome Back!"
          subtitle="Your investments. <br/> Our goal."
        />
        <div className="card fat">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-6">
                  <div className="form-group">
                    <Textfield
                      name="name"
                      type="text"
                      label="Full Name"
                      errorLabel="Full Name"
                      maxLength="20"
                      validate={[required, userFullName]}
                    />
                  </div>
                </div>
                <div className="col-md-2 pr-0">
                  <div className="form-group">
                    <Textfield
                      name="mobileNumberCountryCode"
                      type="text"
                      readOnly="readOnly"
                      label="Code"
                      errorLabel="Country Code"
                      validate={[required, number]}
                      customClass="form-control-custom-addon-left"
                    />
                  </div>
                </div>
                <div className="col-md-4 pl-0">
                  <div className="form-group">
                    <Textfield
                      name="mobileNumber"
                      type="text"
                      maxLength="10"
                      label="Mobile Number"
                      errorLabel="Mobile Number"
                      validate={[required, mobileNumber]}
                      customClass="form-control-custom-addon-right"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <Textfield
                  name="email"
                  type="text"
                  label="Email"
                  errorLabel="Email"
                  validate={[email, required]}
                />
              </div>
              <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-6">
                  <div className="form-group">
                    <Textfield
                      name="password"
                      type="password"
                      label="Password"
                      errorLabel="Password"
                      validate={[required, password]}
                      fieldInfo="At least 1 special case, uppercase & number"
                    />
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6">
                  <div className="form-group">
                    <Textfield
                      name="confirmpassword"
                      type="password"
                      label="Confirm Password"
                      errorLabel="Confirm Password"
                      validate={[required, password]}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-6">
                  <div className="form-group">
                    <Checkbox
                      name="agree"
                      type="checkbox"
                      label=" I agree to terms and conditions"
                      errorLabel="I agree to terms and conditions"
                      validate={required}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block btn-md"
                    disabled={submitting}
                  >
                    Generate OTP
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default reduxForm({
  form: 'registrationform', // a unique identifier for this form
})(RegistrationForm);
