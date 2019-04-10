/* eslint-disable */

import React, { Component, useState } from 'react';
import { Field } from 'redux-form';
import InputRange from 'react-input-range';
import styles from './ReduxRange.module.css';

// RangeSlider

const RenderInputRange = (props) => {
  const [state, setState] = useState({
    value: { min: 2, max: 10 }
  });

  return (
    <InputRange
      maxValue={20}
      minValue={0}
      value={this.state.value}
      onChange={value => setState({ value })}
    />
  );
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
