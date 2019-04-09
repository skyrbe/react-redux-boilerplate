export default {
  // The URL we're connecting to
  hostname: 'http://staging.pod.works',
  // Map shortnames to the actual endpoints, so that we can use them in the middleware
  endpoints: {
    login: '/kp/account/login',
    users: 'users',
    deleteUser: '/users',
    getUser: '/users',
    sendotp: '/api/account/generate/otp',
    verifyotp: '/api/account/verify/otp',
    register: '/api/account/register',
    reset_password: '/api/account/reset/password'
  }
};
