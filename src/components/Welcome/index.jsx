import React, { Component } from 'react';
import Register from '@containers/Register';
import Otp from '@containers/Otp';
/*
* This is an entry form of the application.
**** State Description ****
* entry: for showing registration screen(true)/false
* otp:   for showing otp screen(true)/false
* isRegister:  true/false(We will be using it in OTP screen)
*/
class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: true,
      otp: false,
      isRegister: true,
    };
  }

  /* Setting state to go to otp screen */
  goToOtp = () => {
    this.setState({
      entry: false,
      otp: true,
    });
  };

  /* Setting state to go to register screen */
  goBack = () => {
    this.setState({
      entry: true,
      otp: false,
    });
  };

  render() {
    const { entry, otp, isRegister } = this.state;
    return (
      <div className="container">
        <div className="row m-0 d-flex justify-content-md-center h-100 pb-4">
          {entry && <Register goToOtp={this.goToOtp} />}
          {!entry && otp && <Otp isRegister={isRegister} goBack={this.goBack} />}
        </div>
      </div>
    );
  }
}

export default Welcome;
