import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import users from './users';
import otp from './otp';
import oauth from './oauth';
import { register } from './register';
import password from './password';

const appReducer = combineReducers({
  router: routerReducer,
  users,
  otp,
  oauth,
  password,
  register,
  form: formReducer
});

// Setup root reducer
const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
