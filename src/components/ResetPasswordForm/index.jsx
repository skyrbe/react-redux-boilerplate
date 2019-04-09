import React from 'react';
import { reduxForm } from 'redux-form';
import { required, password } from '@components/common/FormValidation';
import Textfield from '@formElements/TextField';
import Banner from '@components/common/Banner';
import InitialImage from '@assets/images/company.png';

const ResetPasswordForm = (props) => {
  const { handleSubmit } = props;
  return (
    <div className="row m-0 justify-content-md-center h-100">
      <div className="card-wrapper">
        <Banner
          icon={`<img src=${InitialImage} alt="company logo" width="130"/>`}
          title="Set New Password"
          subheader="Welcome Back!"
          subtitle="Your investments. <br/> Our goal."
        />
        <div className="card fat">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-12 form-group">
                  <Textfield
                    name="password"
                    type="password"
                    label="Enter New Password"
                    errorLabel="Password"
                    validate={[required, password]}
                  />
                </div>
                <div className="col-md-12 form-group">
                  <Textfield
                    name="confirmpassword"
                    type="password"
                    label="Enter Confirm Password"
                    errorLabel="Confirm Password"
                    validate={[required, password]}
                  />
                </div>
                <div className="col-md-6 form-group">
                  <button type="submit" className="btn btn-primary btn-block btn-md">
                    Set Password
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

export default (reduxForm({
  form: 'resetpasswordform' // a unique identifier for this form
})(ResetPasswordForm));
