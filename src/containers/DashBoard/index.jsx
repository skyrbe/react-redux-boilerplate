import React from 'react';
import cn from 'classnames';
import styles from './dashboard.module.css';

const DashBoard = () => {
  return (
    <div className="container">
      <div className={cn('row', styles.welcomePage)}>
        <h1 className={cn('col-md-offset-4 col-md-4 text-center', styles.welcomeText)}>
          Welcome to Dashboard
        </h1>
      </div>
    </div>
  );
};

export default DashBoard;
