import React from 'react';
import { Link } from 'react-router-dom'
import {Table} from 'react-bootstrap';
import _ from 'lodash';

const UserList = ({data, onDelete}) => {
  function createTableBody() {
    return _.map(data, user => {
      return (
        <tr key={user.id}>
          <td>{user.name}</td>
          <td>{user.location}</td>
          <td>
            <Link to={`/users/${user.id}`}>
              Edit
            </Link>
            <input
              type      = "button"
              value     = "delete"
              className = "btn btn-primary"
              onClick   = {() => onDelete(user.id)}
            />
          </td>
        </tr>
      );
    });
  }
  return (
    <Table striped bordered condensed hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Location</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {createTableBody()}
      </tbody>
  </Table>);
}

export default UserList;
