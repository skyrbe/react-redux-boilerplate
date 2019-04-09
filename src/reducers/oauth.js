export const OAUTH_REQUESTED = 'oauth/OAUTH_REQUESTED';
export const OAUTH_SUCCESS = 'oauth/OAUTH_SUCCESS';
export const OAUTH_FAILURE = 'oauth/OAUTH_FAILURE';

const initialState = {
  loading: false,
  loaded: false,
  error: false,
  userdata: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case OAUTH_REQUESTED: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case OAUTH_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        loaded: true,
        userdata: action.result
      };
    }
    case OAUTH_FAILURE: {
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


export const login = (data) => {
  return {
    types: [OAUTH_REQUESTED, OAUTH_SUCCESS, OAUTH_FAILURE],
    promise: client => client.post('login', {
      data
    })
  };
};
