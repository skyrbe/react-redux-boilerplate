import React from 'react';
import { reduxForm } from 'redux-form';
import {
  required,
  number,
  mobileNumber,
} from '@components/common/FormValidation';
import Textfield from '@formElements/TextField';
import Banner from '@components/common/Banner';
import InitialImage from '@assets/images/company.png';

const GenerateOtpForm = (props) => {
  const { handleSubmit } = props;
  return (
    <div className="row m-0 justify-content-md-center h-100">
      <div className="card-wrapper">
        <Banner
          icon={`<img src=${InitialImage} alt="company logo" width="130"/>`}
          title="Generate Password."
          subheader="Welcome Back!"
          subtitle="Your investments. <br/> Our goal."
        />
        <div className="card fat">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-2 pr-0">
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
                <div className="col-md-10 pl-0">
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
              <div className="col-md-4 p-0">
                <button
                  type="submit"
                  className="btn btn-primary btn-block btn-md"
                >
                  Get OTP
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default reduxForm({
  form: 'generateotpform', // a unique identifier for this form
})(GenerateOtpForm);
