import React , { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CreateUserForm from '../../components/activeUser';

import {
  getUser
} from '../../reducers/users'

class ActiveUser extends Component {
  componentDidMount() {
    const url = this.props.location.pathname;
    const splitArray = url.split('/');
    this.setState({id:splitArray[splitArray.length-1]},function(){
      this.props.getUser(this.state.id);
    })
  }

  submit = (values) => {
    // Do something with the form values
    console.log(values);
  }

  render() {
    const { loading, loaded, activeUser } = this.props;
    return (
      <div>
        <h1>Home</h1>
        { loading && <div>Loading</div> }
        { loaded && activeUser && <CreateUserForm onSubmit={this.submit} /> }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  activeUser : state.users.activeUser,
  loading    : state.users.loading,
  loaded     : state.users.loaded
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getUser,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveUser)
