import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GenerateOtpForm from '@components/GenerateOtpForm';
import { sendotp } from '@reducers/otp';
/*
**** State Description ****
* initialData: for setting default values of form
* mobile: Mobile Number of user
* mobileNumberCountryCode:  Mobile number country code
* error: true/false based on it message will be shown
* message:  Message to show once any action is perfomed
* type: 1/99 1:sendotp for forgotpwd 99:sendotp for regsitration
*/
class GenerateOtp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialData: {
        mobileNumberCountryCode: '91',
        mobileNumber: this.props.mobileNumber !== 0 ? this.props.mobileNumber : ''
      },
      mobile: 0,
      mobileNumberCountryCode: 0,
      error: false,
      message: '',
      type: 1
    };
  }


  /* Generate otp */
  getotp = (data) => {
    this.setState({
      mobile: data.mobileNumber,
      mobileNumberCountryCode: data.mobileNumberCountryCode
    });
    const dataClone = data;
    dataClone.type = this.state.type;
    const jsondata = JSON.stringify(dataClone);
    /* call send otp */
    this.props.sendotp(jsondata).then(this.successSendOTP).catch(this.failureSendOTP);
  };

  /* success function of Generate otp */
  successSendOTP = () => {
    this.props.verifyOtp(this.state.mobile, this.state.mobileNumberCountryCode);
  };

  /* failure function of Generate otp */
  failureSendOTP = (error) => {
    this.setState({
      error: true,
      message: error.errorMessage
    });
  };

  render() {
    const { initialData, error, message } = this.state;
    return (
      <div>
        { error && (
          <div className="alert alert-danger">
            {message}
          </div>
        )}
        <GenerateOtpForm
          initialValues={initialData}
          onSubmit={this.getotp}
        />
      </div>
    );
  }
}

GenerateOtp.propTypes = {
  sendotp: PropTypes.func.isRequired,
  verifyOtp: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  sendotp
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(GenerateOtp);
