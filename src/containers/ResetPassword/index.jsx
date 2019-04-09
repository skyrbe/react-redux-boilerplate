import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ResetPasswordForm from '@components/ResetPasswordForm';
import { resetPassword } from '@reducers/password';
import { CUSTOM_MESSAGES, APP_CONFIG } from '@constants';
/*
**** State Description ****
* error: true/false based on it message will be shown
* message:  Message to show once any action is perfomed
*/
class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      message: ''
    };
  }

  /* Used to reset password */
  resetPassword = (data) => {
    if (data.password !== data.confirmpassword) {
      this.setState({
        message: CUSTOM_MESSAGES.PASSWORD_MISMATCH,
        error: true
      });
      return;
    }
    /* Create data object for resetting password */
    const dataToSend = {
      mobileNumber: this.props.mobileNumber,
      mobileNumberCountryCode: this.props.mobileNumberCountryCode,
      newPassword: btoa(data.password)
    };
    const jsondata = JSON.stringify(dataToSend);
    /* call reset password */
    this.props.resetPassword(jsondata).then(this.successresetPassword).catch(this.failureresetPassword);
  }

  /* Success function for reset password */
  successresetPassword = () => this.props.history.push(`${APP_CONFIG.BASE_URL}/login`);

  /* Failure function for reset password */
  failureresetPassword = () => {
    this.setState({
      message: 'Error while Changing Password!',
      error: true
    });
  };

  render() {
    const { error, message } = this.state;
    return (
      <div>
        { error && (
          <div className="alert alert-danger">
            {message}
          </div>
        )}
        { !error && message !== '' && (
          <div className="alert alert-success">
            {message}
          </div>
        )}
        <ResetPasswordForm
          onSubmit={this.resetPassword}
        />
      </div>
    );
  }
}

ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  resetPassword
}, dispatch);

export default withRouter(connect(
  null,
  mapDispatchToProps
)(ResetPassword));
