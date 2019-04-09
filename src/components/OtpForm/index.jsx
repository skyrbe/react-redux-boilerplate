import React from 'react';
import { reduxForm } from 'redux-form';
import { required, number } from '@components/common/FormValidation';
import Textfield from '@formElements/TextField';
import Banner from '@components/common/Banner';
import InitialImage from '@assets/images/company.png';

const OtpForm = (props) => {
  const {
    handleSubmit,
    goBack,
    enableResend,
    timervalue,
    resendOtp,
    isRegister,
  } = props;

  let buttonName = 'Register';
  if (!isRegister) buttonName = 'Verify';

  return (
    <div className="row m-0 justify-content-md-center h-100">
      <div className="card-wrapper">
        <Banner
          icon={`<img src=${InitialImage} alt="company logo" width="130"/>`}
          title="Otp"
          subheader="Welcome Back!"
          subtitle="Your investments. <br/> Our goal."
        />
        <div className="card fat">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-12 form-group">
                  <Textfield
                    name="otp"
                    type="text"
                    label="Enter OTP"
                    maxLength="6"
                    errorLabel="Otp"
                    validate={[required, number]}
                  />
                  {timervalue === 0 && (
                    <button
                      type="button"
                      onClick={resendOtp}
                      disabled={!enableResend}
                      className="text-muted link-primary text-underline cursor-pointer float-right r_25 t_15"
                    >
                      Resend OTP
                    </button>
                  )}
                  {timervalue > 0 && (
                    <button
                      className="text-muted float-right pos-a r_25 t_15"
                      type="button"
                    >
                      Resend in
                      {timervalue}
                      seconds
                    </button>
                  )}
                </div>
                <div className="col-md-4 form-group">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block btn-md"
                  >
                    {buttonName}
                  </button>
                </div>
                <div className="col-md-4 form-group">
                  <button
                    onClick={goBack}
                    type="button"
                    className="btn btn-primary btn-block btn-md"
                  >
                    Back
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
  form: 'otpform', // a unique identifier for this form
})(OtpForm);
