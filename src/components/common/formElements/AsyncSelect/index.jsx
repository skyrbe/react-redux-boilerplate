import React, { Component } from 'react';
import { Field } from 'redux-form';
import Select from 'react-select';
import styles from './AsyncSelect.module.css';

class RenderSelectInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: []
    };
  }

  onNewOptionClick = (data) =>{
    const newData = Object.assign(...data, { id: 0 });
    let currentState = this.state.value;
    currentState = currentState.concat(newData);
    this.handleChange(currentState);
  };

  handleChange = (value) => {
    console.log('value ', value);
    this.setState({
      value
    }, () => {
      this.props.selectedTags(this.state.value);
    });
  };

  render() {
    const {
      input,
      name,
      id,
      options,
      placeholder,
      isMulti,
      isDisabled,
      isSearchable,
      className,
      valueKey,
      labelKey,
      loadTags
    } = this.props;

    const AsyncComponent = Select.AsyncCreatable;
    return (
      <AsyncComponent
        {...input}
        name={name}
        className={className}
        multi={isMulti}
        placeholder={placeholder}
        autoload={false}
        isDisabled={isDisabled}
        isSearchable={isSearchable}
        value={this.state.value}
        filterOption={() => (true)}
        onChange={this.handleChange}
        valueKey={valueKey}
        labelKey={labelKey}
        onNewOptionClick={this.onNewOptionClick}
        loadOptions={loadTags}
        options={options}
        onBlur={() => input.onBlur(input.value)}
        id={id}
      />
    );
  }
}

const AsyncSelect = (props) => {
  const {
    name,
    id,
    options,
    onChange,
    placeholder,
    isMulti,
    isDisabled,
    isSearchable,
    className,
    valueKey,
    labelKey,
    loadTags,
    selectedTags
  } = props;
  return (
    <div className={styles.wrap}>
      <Field
        name={name}
        component={RenderSelectInput}
        id={id}
        options={options}
        onChange={onChange}
        placeholder={placeholder}
        isMulti={isMulti}
        isDisabled={isDisabled}
        isSearchable={isSearchable}
        className={className}
        valueKey={valueKey}
        labelKey={labelKey}
        loadTags={loadTags}
        selectedTags={selectedTags}
      />
    </div>
  );
};
export default AsyncSelect;
