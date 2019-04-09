import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoginForm from '@components/LoginForm';
import { login } from '@reducers/oauth';
import { getregisteruserinfo } from '@reducers/otp';
import { CUSTOM_MESSAGES, APP_CONFIG } from '@constants';

/*
**** State Description ****
* error: true/false based on it message will be shown
* message:  Message to show once any action is perfomed
*/
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      message: ''
    };
  }

  componentWillMount() {
    this.props.getregisteruserinfo({ mobileNumberCountryCode: '91' });
  }

  /* Login */
  login = (data) => {
    const jsondata = JSON.stringify(data);
    /* login API */
    this.props.login(jsondata).then(this.successLogin).catch(this.failureLogin);
  };

  /* sucess of login function */
  successLogin = (data) => {
    this.setState({
      message: CUSTOM_MESSAGES.LOGIN_SUCCESS,
      error: false
    });

    window.localStorage.setItem('userData', JSON.stringify(data));
    // window.location.href="/dashboard"
    this.props.history.replace(`${APP_CONFIG.BASE_URL}/dashboard`);
  };

  /* Failure of login function */
  failureLogin = (error) => {
    this.setState({
      message: error.errorMessage,
      error: true
    });
  };

  render() {
    const { error, message } = this.state;
    return (
      <div>
        {error && (
          <div className="alert alert-danger">
            {message}
          </div>
        )}
        {!error && message !== '' && (
          <div className="alert alert-success">
            {message}
          </div>
        )}
        <LoginForm onSubmit={this.login} />
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  login,
  getregisteruserinfo
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Login);
