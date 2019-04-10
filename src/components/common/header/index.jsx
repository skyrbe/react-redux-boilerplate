/*eslint-disable*/

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';
import { APP_CONFIG } from '@constants';

const Header = () => {
  const userData = JSON.parse(window.localStorage.getItem('userData') || {});
  let name = '';
  if (userData && userData !== null) {
    name = userData.name !== undefined ? userData.name : 'user';
  } else {
    name = 'user';
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className = {styles.logo}></div>
      <a className="navbar-brand" href="#">Logo</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Link</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">Action</a>
              <a className="dropdown-item" href="#">Another action</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="#">Disabled</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
