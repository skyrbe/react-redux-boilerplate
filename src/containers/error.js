import React , { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { sendotp,getregisteruserinfo } from '../../reducers/otp';

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      registerdata: {}
    }
  }

  componentWillMount = () =>{
    if(this.props.userinfo != null){
      const data = {
        username: this.props.userinfo.username,
        mobile:this.props.userinfo.mobile,
        email: this.props.userinfo.email
      };

      this.setState({registerdata:data});
    }
  }

  sendOtp = (data) =>{
    if(data.password != data.confirmpassword){
      alert("Invalid password");
      data = {
        password : '',
        confirmpassword : ''
      };
      this.setState({registerdata:data});
    }
    else{
      this.props.getregisteruserinfo(data);
      this.props.sendotp(data);
      this.props.register();
    }
  }

  render() {
    const { registerdata } = this.state;
    return (
      <div>
          <RegisterForm initialValues={registerdata}  onSubmit={this.sendOtp} />
      </div>
    )
  }
}

Register.propTypes = {
 register: PropTypes.func.isRequired,
 sendotp: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  loading : state.users.loading,
  loaded : state.users.loaded,
  userinfo:state.otp.registerUser
})


const mapDispatchToProps = dispatch => bindActionCreators({
  sendotp,
  getregisteruserinfo
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)
