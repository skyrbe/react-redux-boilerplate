import _ from 'lodash';

export const GET_USERS_REQUESTED = 'users/USERS_REQUESTED'
export const GET_USERS_SUCCESS = 'users/USERS_SUCCESS'
export const GET_USERS_FAILURE = 'users/USERS_FAILURE'

export const GET_USER_REQUESTED = 'users/USER_REQUESTED'
export const GET_USER_SUCCESS = 'users/USER_SUCCESS'
export const GET_USER_FAILURE = 'users/USER_FAILURE'

export const DELETE_USER_REQUESTED = 'users/DELETE_USER_REQUESTED'
export const DELETE_USER_SUCCESS = 'users/DELETE_USER_SUCCESS'
export const DELETE_USER_FAILURE = 'users/DELETE_USER_FAILURE'

const initialState = {
  loading: false,
  loaded: false,
  error: false,
  data:null,
  activeUser:null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_REQUESTED: {
      return {
        ...state,
        loading:true,
        loaded:false
      }
    }
    case GET_USERS_SUCCESS: {
      return {
        ...state,
        loading:false,
        error:false,
        loaded:true,
        data:_.mapKeys(action.result, 'id')
      }
    }
    case GET_USERS_FAILURE: {
      return {
        ...state,
        loading:false,
        loaded:false,
        error:true
      }
    }

    case GET_USER_REQUESTED: {
      return {
        ...state,
        loading:true,
        loaded:false
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        loading:false,
        error:false,
        loaded:true,
        activeUser:action.result
      }
    }
    case GET_USER_FAILURE: {
      return {
        ...state,
        loading:false,
        loaded:false,
        error:true
      }
    }

    case DELETE_USER_REQUESTED: {
      return {
        ...state,
        loading:true,
        loaded:false,
      }
    }
    case DELETE_USER_SUCCESS: {
      return {
        ...state,
        loading:false,
        error:false,
        loaded:true,
        data: _.omit(state.data, action.payload)
      }
    }
    case DELETE_USER_FAILURE: {
      return {
        ...state,
        loading:false,
        loaded:false,
        error:true
      }
    }
    default:
      return state
  }
}

export const getAllUsers = () => {
  return {
    types: [GET_USERS_REQUESTED, GET_USERS_SUCCESS, GET_USERS_FAILURE],
    promise: (client) => client.get('users')
  };
}

export const deleteUser = (id) => {
  return {
    types: [DELETE_USER_REQUESTED, DELETE_USER_SUCCESS, DELETE_USER_FAILURE],
    promise: (client) => client.del(`deleteUser/${id}/`),
    payload:id
  };
}

export const getUser = (id) => {
  return {
    types: [GET_USER_REQUESTED, GET_USER_SUCCESS, GET_USER_FAILURE],
    promise: (client) => client.get(`getUser/${id}/`),
  };
}
