import React from 'react';
import { Link } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import Banner from '@components/common/Banner';
import {
  required,
  password,
  mobileAndEmail,
} from '@components/common/FormValidation';
import Textfield from '@formElements/TextField';
import InitialImage from '@assets/images/company.png';
import { ERROR_LABEL, APP_CONFIG } from '@constants';

const LoginForm = (props) => {
  const { handleSubmit, loading } = props;
  return (
    <div className="row m-0 justify-content-md-center h-100">
      <div className="card-wrapper">
        <Banner
          icon={`<img src=${InitialImage} alt="company logo" width="130"/>`}
          title="Financial freedom, a login away."
          subheader="Welcome Back!"
          subtitle="Your investments. <br/> Our goal."
        />
        <div className="card fat">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <Textfield
                  name="username"
                  type="text"
                  maxLength="10"
                  label="Enter Mobile Number"
                  autocomplete="username"
                  errorLabel={ERROR_LABEL.MOBILE_AND_EMAIL}
                  validate={[required, mobileAndEmail]}
                />
              </div>
              <div className="form-group">
                <Textfield
                  name="password"
                  type="password"
                  label="Enter Password"
                  autocomplete="current-password"
                  errorLabel={ERROR_LABEL.PASSWORD}
                  validate={[required, password]}
                />
              </div>
              <div className="form-group">
                <Link
                  to={`${APP_CONFIG.BASE_URL}/forgotpassword`}
                  className="float-right"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="form-group no-margin">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary btn-block btn-md"
                >
                  Login
                </button>
              </div>
              <div className="margin-top20 text-center">
                Donot have an account?
                <Link to="/">
                  Create One
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default reduxForm({
  form: 'loginform', // a unique identifier for this form
})(LoginForm);
