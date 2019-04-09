import React, { Component } from 'react';
import GenerateOtp from '@containers/GenerateOtp';
import Otp from '@containers/Otp';
import ResetPassword from '@containers/ResetPassword';
// import InitialImage from '@assets/images/login.png';
/*
* This is an entry flow for forgot Password Flow.
**** State Description ****
* mobileNumber: mobile number of the user
* mobileNumberCountryCode: country code of mobile number
* getOtp:  for showing generate otp screen true/false
* verifyOtp:  for showing verify otp screen true/false
* resetPassword:  for showing reset pwd screen true/false
* isRegister:  true/false(We will be using it in OTP screen)
*/
class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNumber: 0,
      mobileNumberCountryCode: 0,
      getOtp: true,
      verifyOtp: false,
      resetPassword: false,
      isRegister: false
    };
  }

  /* Setting state to go to verify otp screen */
  verifyOtp = (mobileNumber, mobileNumberCountryCode) => {
    this.setState({
      mobileNumber,
      mobileNumberCountryCode,
      getOtp: false,
      verifyOtp: true,
      resetPassword: false
    });
  };

  /* Setting state to go to generate otp screen */
  goBack = () => {
    this.setState({
      getOtp: true,
      verifyOtp: false,
      resetPassword: false
    });
  }

  /* Setting state to go to generate otp screen */
  resetPasswordScreen = () => {
    this.setState({
      getOtp: false,
      verifyOtp: false,
      resetPassword: true
    });
  }

  render() {
    const {
      getOtp,
      verifyOtp,
      resetPassword,
      isRegister,
      mobileNumber,
      mobileNumberCountryCode
    } = this.state;
    return (
      <div className="container">
        <div className="row m-0 justify-content-md-center h-100">
          <div className="col-md-5  mt_10">
            { getOtp && !verifyOtp && !resetPassword && (
              <GenerateOtp
                mobileNumber={mobileNumber}
                verifyOtp={this.verifyOtp}
              />
            )}
            { !getOtp && verifyOtp && !resetPassword && (
              <Otp
                mobileNumber={mobileNumber}
                mobileNumberCountryCode={mobileNumberCountryCode}
                isRegister={isRegister}
                goBack={this.goBack}
                resetPassword={this.resetPasswordScreen}
              />
            )}
            { !getOtp && !verifyOtp && resetPassword && (
              <ResetPassword
                mobileNumber={mobileNumber}
                mobileNumberCountryCode={mobileNumberCountryCode}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Welcome;
