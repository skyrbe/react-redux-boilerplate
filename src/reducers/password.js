export const RESET_PASSWORD_REQUESTED = 'password/RESET_PASSWORD_REQUESTED';
export const RESET_PASSWORD_SUCCESS = 'password/RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'password/RESET_PASSWORD_FAILURE';

const initialState = {
  loading: false,
  loaded: false,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUESTED: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        loaded: true
      };
    }
    case RESET_PASSWORD_FAILURE: {
      return {
        ...state,
        loading: false,
        error: false,
        loaded: true
      };
    }
    default:
      return state;
  }
};


export const resetPassword = (data) => {
  const headers = { has_auth_token: 0 };
  return {
    types: [RESET_PASSWORD_REQUESTED, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE],
    promise: client => client.post('reset_password', {
      data,
      headers
    })
  };
};
