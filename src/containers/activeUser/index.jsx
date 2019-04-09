/* eslint-disable no-unused-vars */

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CreateUserForm from '@components/activeUser';

import {
  getUser,
  putUser,
  getOptions,
  searchOptions
} from '../../reducers/users';

class ActiveUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onSearchOption = this.onSearchOption.bind(this);
  }

  componentDidMount() {
    const url = this.props.location.pathname;
    const splitArray = url.split('/');
    this.setState({ id: splitArray[splitArray.length - 1] }, () => {
      this.props.getUser(this.state.id);
      this.props.getOptions();
    });
    this.submit = this.submit.bind(this);
  }

  onSearchOption = (data, callback) => {
    console.log('data', data);
    this.props.searchOptions(data).then(() => { callback(this.props.options); }).catch(() => { callback([]); });
  }

  submit = (values) => {
    this.props.putUser(this.state.id, values);
  };

  render() {
    const {
      loading,
      loaded,
      activeUser,
      options
    } = this.props;
    return (
      <div>
        <h1>
          Home
        </h1>
        { loading && (
          <div>
            Loading
          </div>
        )}
        { loaded && activeUser && (
          <CreateUserForm
            onSubmit={this.submit}
            options={options}
            onSearchOption={this.onSearchOption}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activeUser: state.users.activeUser,
  options: state.users.options,
  loading: state.users.loading,
  loaded: state.users.loaded
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getUser,
  putUser,
  getOptions,
  searchOptions
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveUser);
