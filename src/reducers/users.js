import _ from 'lodash';

export const GET_USERS_REQUESTED = 'users/USERS_REQUESTED';
export const GET_USERS_SUCCESS = 'users/USERS_SUCCESS';
export const GET_USERS_FAILURE = 'users/USERS_FAILURE';

export const GET_USER_REQUESTED = 'users/USER_REQUESTED';
export const GET_USER_SUCCESS = 'users/USER_SUCCESS';
export const GET_USER_FAILURE = 'users/USER_FAILURE';

export const GET_OPTIONS_REQUESTED = 'users/OPTIONS_REQUESTED';
export const GET_OPTIONS_SUCCESS = 'users/OPTIONS_SUCCESS';
export const GET_OPTIONS_FAILURE = 'users/OPTIONS_FAILURE';

export const GET_OPTION_REQUESTED = 'users/OPTION_REQUESTED';
export const GET_OPTION_SUCCESS = 'users/OPTION_SUCCESS';
export const GET_OPTION_FAILURE = 'users/OPTION_FAILURE';

export const PUT_USER_REQUESTED = 'users/PUT_USER_REQUESTED';
export const PUT_USER_SUCCESS = 'users/PUT_USER_SUCCESS';
export const PUT_USER_FAILURE = 'users/PUT_USER_FAILURE';

export const DELETE_USER_REQUESTED = 'users/DELETE_USER_REQUESTED';
export const DELETE_USER_SUCCESS = 'users/DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'users/DELETE_USER_FAILURE';

const initialState = {
  loading: false,
  loaded: false,
  error: false,
  data: null,
  activeUser: null,
  options: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_REQUESTED: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case GET_USERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        loaded: true,
        data: _.mapKeys(action.result, 'id')
      };
    }
    case GET_USERS_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: true
      };
    }

    case GET_USER_REQUESTED: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        loaded: true,
        activeUser: action.result
      };
    }
    case GET_OPTIONS_REQUESTED: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case GET_OPTIONS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        loaded: true,
        options: action.result
      };
    }
    case GET_OPTIONS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: true,
        loaded: true
      };
    }
    case GET_OPTION_REQUESTED: {
      return {
        ...state
      };
    }
    case GET_OPTION_SUCCESS: {
      const res = [];
      res.push(action.result);
      return {
        ...state,
        options: res
      };
    }
    case GET_OPTION_FAILURE: {
      return {
        ...state
      };
    }
    case PUT_USER_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: true
      };
    }
    case PUT_USER_REQUESTED: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case PUT_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        loaded: true,
        activeUser: action.payload
      };
    }
    case GET_USER_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: true
      };
    }

    case DELETE_USER_REQUESTED: {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }
    case DELETE_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        loaded: true,
        data: _.omit(state.data, action.payload)
      };
    }
    case DELETE_USER_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: true
      };
    }
    default:
      return state;
  }
};

export const getAllUsers = () => {
  return {
    types: [GET_USERS_REQUESTED, GET_USERS_SUCCESS, GET_USERS_FAILURE],
    promise: client => client.get('fakeapi/users')
  };
};

export const deleteUser = (id) => {
  return {
    types: [DELETE_USER_REQUESTED, DELETE_USER_SUCCESS, DELETE_USER_FAILURE],
    promise: client => client.del(`deleteUser/${id}/`),
    payload: id
  };
};

export const putUser = (id, data) => {
  return {
    types: [PUT_USER_REQUESTED, PUT_USER_SUCCESS, PUT_USER_FAILURE],
    promise: client => client.put(`fakeapi/users/${id}/`, { data }),
    payload: data
  };
};

export const getUser = (id) => {
  return {
    types: [GET_USER_REQUESTED, GET_USER_SUCCESS, GET_USER_FAILURE],
    promise: client => client.get(`fakeapi/users/${id}/`),
  };
};

export const getOptions = () => {
  return {
    types: [GET_OPTIONS_REQUESTED, GET_OPTIONS_SUCCESS, GET_OPTIONS_FAILURE],
    promise: client => client.get('fakeapi/options'),
  };
};

export const searchOptions = (id) => {
  return {
    types: [GET_OPTION_REQUESTED, GET_OPTION_SUCCESS, GET_OPTION_FAILURE],
    promise: client => client.get(`fakeapi/options/${id}/`),
  };
};
