import React , { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './index.css';
import UserList from '../../components/users';

import {
  getAllUsers,
  deleteUser
} from '../../reducers/users'

class Users extends Component {
  componentWillMount() {
    this.props.getAllUsers();
  }
  onDelete = (id) => {
    this.props.deleteUser(id);
  }
  render() {
    const {loading, loaded, users } = this.props;
    return (
      <div className = "user-table">
        <h1>Home</h1>
        {loading && <div>Loading</div>}
        {loaded && users && <UserList data = {users} onDelete = {this.onDelete} />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users : state.users.data,
  loading : state.users.loading,
  loaded : state.users.loaded
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllUsers,
  deleteUser
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users)
