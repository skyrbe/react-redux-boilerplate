import React, { Component } from 'react';
import cx from 'classnames';
import styles from './banner.module.css';

export default class Banner extends Component {
  rawMarkup = (data) => {
    const rawMarkup = data;
    return { __html: rawMarkup };
  }

  render() {
    return (
      <div className="col-xs-12 no-padding banner-area-container">
        <div className="col-xs-12">
          <div className="pa_10 text-center">
            <p dangerouslySetInnerHTML={this.rawMarkup(this.props.icon)} />
          </div>
          <div className="col-xs-12 text-center">
            <h1 className={cx('m-0', styles.bannerHeader, 'position-relative', 'mb-3')}>
              {this.props.title}
            </h1>
          </div>
          <div className="col-xs-12 text-center col-md-12">
            <p className="no-margin bannerSubheader" dangerouslySetInnerHTML={this.rawMarkup(this.props.subtitle)} />
          </div>
        </div>
      </div>
    );
  }
}
