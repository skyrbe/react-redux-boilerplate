export const GET_OTP_REQUESTED = 'otp/OTP_REQUESTED';
export const GET_OTP_SUCCESS = 'otp/OTP_SUCCESS';
export const GET_OTP_FAILURE = 'otp/OTP_FAILURE';

export const VERIFY_OTP_REQUESTED = 'otp/VERIFY_OTP_REQUESTED';
export const VERIFY_OTP_SUCCESS = 'otp/VERIFY_OTP_SUCCESS';
export const VERIFY_OTP_FAILURE = 'otp/VERIFY_OTP_FAILURE';


export const GET_USER_DATA = 'otp/GET_USER_DATA';
const initialState = {
  loading: false,
  loaded: false,
  error: false,
  registerUser: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_OTP_REQUESTED: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case GET_OTP_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        loaded: true
      };
    }
    case GET_OTP_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: true
      };
    }
    case VERIFY_OTP_REQUESTED: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case VERIFY_OTP_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        loaded: true
      };
    }
    case VERIFY_OTP_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: true
      };
    }
    case GET_USER_DATA: {
      return {
        registerUser: action.payload
      };
    }
    default:
      return state;
  }
};


export const sendotp = (data) => {
  const headers = { has_auth_token: 0 };
  return {
    types: [GET_OTP_REQUESTED, GET_OTP_SUCCESS, GET_OTP_FAILURE],
    promise: client => client.post('sendotp', {
      data,
      headers
    })
  };
};

export const verifyotp = (data) => {
  const headers = { has_auth_token: 0 };
  return {
    types: [VERIFY_OTP_REQUESTED, VERIFY_OTP_SUCCESS, VERIFY_OTP_FAILURE],
    promise: client => client.post('verifyotp', {
      data,
      headers
    })
  };
};


export const getregisteruserinfo = (data) => {
  return {
    type: GET_USER_DATA,
    payload: data
  };
};
