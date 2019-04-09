import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import OtpForm from '@components/OtpForm';
import { register } from '@reducers/register';
import { sendotp, verifyotp } from '@reducers/otp';
import { CUSTOM_MESSAGES, APP_CONFIG } from '@constants';

/*
**** State Description ****
* enableResend: true/false Used to enable resend
* timer:  In seconds,used for resend button
* error: true/false based on it message will be shown
* message:  Message to show once any action is perfomed
*/
class Otp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enableResend: false,
      timer: 3,
      error: false,
      message: ''
    };
    // this.verifyOtp = this.verifyOtp.bind(this);
  }

  /* Start the resend timer once compoenents gets loaded */
  componentWillMount = () => {
    this.startCountdownTimer();
  }

  /* Clear timer value */
  componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  /* Timer for resend countdown */
  startCountdownTimer = () => {
    let counterValue;
    this.timer = window.setInterval(() => {
      counterValue = this.state.timer;
      this.setState({ timer: parseInt(counterValue, 10) - 1 }, () => {
        if (this.state.timer === 0) {
          this.setState({ enableResend: true });
          window.clearInterval(this.timer);
        }
      });
    }, 1000);
  };

  /* Resend otp */
  resendOtp = () => {
    this.setState({
      enableResend: false,
      timer: 3
    });
    this.startCountdownTimer();
    let jsondata;
    if (this.props.isRegister) {
      const dataToSet = Object.assign({}, this.props.userinfo);
      delete dataToSet.name;
      delete dataToSet.password;
      dataToSet.type = 99;
      jsondata = JSON.stringify(dataToSet);
    } else {
      const data = {
        mobileNumber: this.props.mobileNumber,
        mobileNumberCountryCode: this.props.mobileNumberCountryCode,
        type: 1,
      };
      jsondata = JSON.stringify(data);
    }
    this.props.sendotp(jsondata).then(this.successResendOtp).catch(this.failureResendOtp);
  }

  /* Verify Otp */
  verifyOtp = (data) => {
    let dataToSend = {};
    if (this.props.isRegister) {
      dataToSend = Object.assign(data, this.props.userinfo);
      const jsondata = JSON.stringify(dataToSend);
      this.props.register(jsondata).then(this.successRegister).catch(this.failureRegister);
    } else {
      dataToSend = {
        mobileNumber: this.props.mobileNumber,
        mobileNumberCountryCode: this.props.mobileNumberCountryCode,
        type: 1,
        otp: data.otp
      };
      const jsondata = JSON.stringify(dataToSend);
      this.props.verifyotp(jsondata).then(this.successVerifyOtp).catch(this.failureVerifyOtp);
    }
  }

  /* Success of Verify Otp */
  successVerifyOtp = () => this.props.resetPassword();

  /* Failure of Verify Otp */
  failureVerifyOtp = (error) => {
    this.setState({
      message: error.errorMessage,
      error: true
    });
  };

  /* Success function while Registration */
  failureRegister = (error) => {
    this.setState({
      message: error.errorMessage,
      error: true
    });
  };

  /* Failure function while Registration */
  successRegister = () => this.props.history.push(`${APP_CONFIG.BASE_URL}/login`);

  successResendOtp = () => {
    this.setState({
      message: CUSTOM_MESSAGES.OTP_SUCCESS,
      error: false
    });
  };

  failureResendOtp = (error) => {
    this.setState({
      message: error.errorMessage,
      error: true
    });
  };

  render() {
    const { goBack, isRegister } = this.props;
    const {
      enableResend,
      timer,
      error,
      message
    } = this.state;
    return (
      <div>
        {error && (
          <div className="alert alert-danger">
            {message}
          </div>
        )}
        {!error && message.length > 1 && (
          <div className="alert alert-success">
            {message}
          </div>
        )}
        <OtpForm
          isRegister={isRegister}
          timervalue={timer}
          enableResend={enableResend}
          resendOtp={this.resendOtp}
          onSubmit={this.verifyOtp}
          goBack={goBack}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.register.loading,
  loaded: state.register.loaded,
  userinfo: state.otp.registerUser
});

const mapDispatchToProps = dispatch => bindActionCreators({
  register,
  sendotp,
  verifyotp
}, dispatch);


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Otp));
