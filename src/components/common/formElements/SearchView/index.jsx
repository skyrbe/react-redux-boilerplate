import React from 'react';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import Textfield from '@formElements/TextField';
import cn from 'classnames';
import styles from './search.module.css';

const SearchView = ({
  handleSubmit,
  prependIconClass, // icon before text input
  customSizeClass, // size of search box usually defined by 'col-12'
  appendIconClass, // not required if isSubmit===false
  searchFieldName, // name of that input field ex-searchBox
  placeholder, // placeholder for that input field
  onChange, // value passes as props
  onSubmit, // onSubmit function if isSubmit===true
  isSubmit, // if submit button is required
  hasNoStartingSpace
}) => {
  const submit = (data) => {
    if (isSubmit) {
      onSubmit(data);
    }
  };
  return (
    <div className={`${customSizeClass}`}>
      <form onSubmit={handleSubmit(submit)}>
        <div className="form-group d-flex">
          <span className={cn(styles.inputAddOnItem, 'pl-3 pr-3 lh_45')}>
            <span className={cn(`${prependIconClass}`)} />
          </span>
          <Textfield
            name={searchFieldName}
            type="text"
            placeholder={placeholder}
            onChange={() => onChange}
            customClass={isSubmit ? styles.customInputSubmit : styles.customInput}
            hasNoStartingSpace={hasNoStartingSpace}
          />
          {isSubmit && (
            <button type="submit" disabled={!isSubmit} className={cn('pr-3 pl-3', styles.inputAppendItem)}>
              <span className={appendIconClass} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

SearchView.propTypes = {
  prependIconClass: PropTypes.string,
  customSizeClass: PropTypes.string,
  appendIconClass: PropTypes.string,
  searchFieldName: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  isSubmit: PropTypes.bool,
  hasNoStartingSpace: PropTypes.bool
};

SearchView.defaultProps = {
  prependIconClass: 'fa fa-search',
  customSizeClass: 'col-8 pr-1 mt-3',
  appendIconClass: 'fa fa-arrow-right',
  isSubmit: false,
  placeholder: 'Search',
  hasNoStartingSpace: true
};

export default reduxForm({
// a unique identifier for this form.
// You can use your own form name just pass "form: 'somename'"
  form: 'searchViewForm',
})(SearchView);
