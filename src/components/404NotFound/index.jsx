import React from 'react';
import errorPage from '@assets/images/404_error.png';

const notFound = () => {
  return (
    <div>
      <img
        src={errorPage}
        alt="fullimage"
        className="img-responsive"
      />
    </div>
  );
};

export default notFound;
