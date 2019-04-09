import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RegisterForm from '@components/RegisterForm';
import { sendotp, getregisteruserinfo } from '@reducers/otp';
import { CUSTOM_MESSAGES } from '@constants';

/*
**** State Description ****
* registerdata: for setting default values of form
* error: true/false based on it message will be shown
* message:  Message to show once any action is perfomed
*/
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialData: {
        mobileNumberCountryCode: '91'
      },
      error: false,
      message: ''
    };
  }

  /* state will be changed if user has already filled the form
  * and clicked on back button to manipulate some information
  */
  componentWillMount = () => {
    if (this.props.userinfo !== null) {
      const data = this.props.userinfo;
      data.password = '';
      data.confirmpassword = '';
      this.setState({ initialData: data });
    }
  }

  /* Generate OTP */
  sendOtp = (data) => {
    /* Check for password validity */
    if (data.password !== data.confirmpassword) {
      this.setState({
        message: CUSTOM_MESSAGES.PASSWORD_MISMATCH,
        error: true
      });
    } else {
      const dataToSet = Object.assign({}, data);
      delete dataToSet.confirmpassword;
      dataToSet.password = btoa(dataToSet.password);/* encrypt base64 for password */
      this.props.getregisteruserinfo(dataToSet);

      /* set data to send for send otp */
      const dataToSend = Object.assign({}, data);
      dataToSend.type = 99;
      delete dataToSend.name;
      delete dataToSend.confirmpassword;
      delete dataToSend.password;
      const jsondata = JSON.stringify(dataToSend);

      /* call send otp */
      this.props.sendotp(jsondata).then(this.successSendOTP).catch(this.failureSendOTP);
    }
  }

  /* sucess function on OTP Generation */
  successSendOTP = () => {
    this.props.goToOtp();
  };

  /* failure function on OTP Generation */
  failureSendOTP = (error) => {
    this.setState({
      message: error.errorMessage,
      error: true
    });
  };


  render() {
    const { error, message, initialData } = this.state;
    return (
      <div>
        { error && (
          <div className="alert alert-danger">
            {message}
          </div>
        )}
        <RegisterForm
          initialValues={initialData}
          onSubmit={this.sendOtp}
        />
      </div>
    );
  }
}

Register.propTypes = {
  getregisteruserinfo: PropTypes.func.isRequired,
  sendotp: PropTypes.func.isRequired,
  goToOtp: PropTypes.func.isRequired,
  userinfo: PropTypes.shape,
};

Register.defaultProps = {
  userinfo: {}
};

const mapStateToProps = state => ({
  userinfo: state.otp.registerUser
});

const mapDispatchToProps = dispatch => bindActionCreators({
  sendotp,
  getregisteruserinfo
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
