/* eslint-disable */

import React, { Component, Fragment } from 'react';
import { Field } from 'redux-form';
import InputRange from 'react-input-range';
import styles from './ReduxRange.css';

// RangeSlider
class RenderInputRange extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: { min: 2, max: 10 },
    };
  }

  render() {
    return (
      <InputRange
        maxValue={20}
        minValue={0}
        value={this.state.value}
        onChange={value => this.setState({ value })}
      />
    );
  }
}

const ReduxRange = (props) => {
  const {
    name,
    rangeProps
  } = props;
  return (
    <div className = {styles.wrap}>
      <Field
        name={name}
        maxValue={20}
        minValue={0}
        component={RenderInputRange}
      />
    </div>
  );
};

export default ReduxRange;
